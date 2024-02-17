import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Outlet } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const project = params.projectId
  return json({ project })
}

export default function Notes() {
  const { project } = useLoaderData<typeof loader>()
  return (
    <>
      <Outlet />
      <h1>Projects {project}</h1>
      <h2>
        <a href={`/projects/${project}/notes`}>Notes</a>
      </h2>
      <ul>
        <li>
          <a href={`/projects/${project}/notes/1`}>Note 1</a>
        </li>
        <li>
          <a href={`/projects/${project}/notes/2`}>Note 2</a>
        </li>
        <li>
          <a href={`/projects/${project}/notes/3`}>Note 3</a>
        </li>
        <li>
          <a href={`/projects/${project}/notes/4`}>Note 4</a>
        </li>
      </ul>
    </>
  )
}
