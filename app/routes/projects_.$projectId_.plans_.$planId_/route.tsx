import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const plan = params.planId
  return json({ plan })
}

export default function Plan() {
  const { plan } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>Plan {plan}</h1>
      <p>note</p>
    </>
  )
}
