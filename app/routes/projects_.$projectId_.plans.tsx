import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Outlet } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const project = params.projectId
  return json({ project })
}

export default function Plans() {
  const { project } = useLoaderData<typeof loader>()
  return (
    <>
      <Outlet />
      <h1>Projects {project}</h1>
      <h2>
        <a href={`/projects/${project}/plans`}>Plans</a>
      </h2>
      <ul>
        <li>
          <a href={`/projects/${project}/plans/A`}>Plan A</a>
        </li>
        <li>
          <a href={`/projects/${project}/plans/B`}>Plan B</a>
        </li>
        <li>
          <a href={`/projects/${project}/plans/C`}>Plan C</a>
        </li>
        <li>
          <a href={`/projects/${project}/plans/D`}>Plan D</a>
        </li>
      </ul>
    </>
  )
}
