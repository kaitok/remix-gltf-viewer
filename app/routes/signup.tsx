import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, useActionData, redirect } from '@remix-run/react'
import { json } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import Button from '~/components/Button'
import { register } from '~/services/register.server'
import { login } from '~/services/login.server'
import { prisma } from '~/db.server'
import { getSession, commitSession } from '~/services/session.server'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const username = String(formData.get('username'))
  const password = String(formData.get('password'))
  const errors: any = {}

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (existingUser) {
    errors.username = 'username already exist'
    if (Object.keys(errors).length > 0) {
      return json({ errors })
    }
  }

  const user = await register(username, password)
  let session = await getSession(request.headers.get('Cookie'))
  session.set(authenticator.sessionKey, user)
  return redirect('/', {
    headers: { 'Set-Cookie': await commitSession(session) },
  })
}

export default function SignUp() {
  const actionData = useActionData<typeof action>()
  return (
    <div className="py-5 px-8">
      <div className="max-w-xl mt-5">
        <div className="my-3">
          <h1 className="text-xl">Create Account</h1>
        </div>
        <Form method="post">
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="rounded-sm bg-gray-50 border border-gray-200 border-b-[1px] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
            {actionData?.errors?.username ? (
              <em>{actionData?.errors.username}</em>
            ) : null}
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
              className="rounded-sm bg-gray-50 border border-gray-200 border-b-[1px] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" bgColor="black" textColor="white">
              Create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
