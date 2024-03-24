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

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <header>
          <nav className="bg-white border-gray-200 px-5 lg:px-6 py-5 border-b-black border-b-[.5px]">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <a href="/" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap">
                  Field
                </span>
              </a>
            </div>
          </nav>
        </header>
        <div className=" max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 p-5">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
