import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const project = params.projectId
  console.log('projects/id')
  return json({ project })
}

export default function Project() {
  const { project } = useLoaderData<typeof loader>()
  return <h1>Project {project}</h1>
}
