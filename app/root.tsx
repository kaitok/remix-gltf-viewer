import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import Button from './components/Button'
import { useLoaderData } from '@remix-run/react'
import { authenticator } from './services/auth.server'
import { useRouteLoaderData } from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export async function loader({ request }: LoaderFunctionArgs) {
  const isLogin: boolean = (await authenticator.isAuthenticated(request))
    ? true
    : false
  return json({ isLogin })
}

export default function App() {
  const { isLogin } = useLoaderData<typeof loader>()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          backgroundColor: '#fafafa',
        }}
      >
        <header>
          <nav className="border-gray-200 px-5 lg:px-6 py-4 border-b-black border-b-[.5px]">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <div>
                <a href="/" className="flex items-center">
                  <span className="self-center text-lg font-medium whitespace-nowrap">
                    glTF Viewer
                  </span>
                </a>
              </div>
              <div>
                {isLogin && (
                  <form action="/logout" method="post">
                    <Button
                      type="submit"
                      bgColor="white"
                      textColor="black"
                      border={true}
                    >
                      Log out
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </nav>
        </header>
        <div className="max-w-screen-xl mx-auto">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
