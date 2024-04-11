import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: '/' })
}

export const loader = async () => {
  return redirect('/login')
}
