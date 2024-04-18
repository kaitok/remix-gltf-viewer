import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'
import Button from '~/components/Button'

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate('user-pass', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })
}

export default function Screen() {
  return (
    <div className="py-5 px-8">
      <div className="max-w-xl mt-5">
        <div className="my-3">
          <h1 className="text-xl">Login</h1>
        </div>
        <Form method="post">
          <div className="flex justify-end">
            <a href="signup">Create account</a>
          </div>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" bgColor="black" textColor="white">
              Sign In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
