import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Outlet } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const project = params.projectId
  return json({ project })
}

export default function Project() {
  const { project } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>Project {project}</h1>

      <h2>
        <a href={`/projects/${project}/notes`}>Notes</a>
      </h2>
      <ul>
        <li>
          <a href={`/projects/${project}/notes/1`}>Notes 1</a>
        </li>
        <li>
          <a href={`/projects/${project}/notes/2`}>Notes 2</a>
        </li>
        <li>
          <a href={`/projects/${project}/notes/3`}>Notes 3</a>
        </li>
        <li>
          <a href={`/projects/${project}/notes/4`}>Notes 4</a>
        </li>
      </ul>
    </>
  )
}
