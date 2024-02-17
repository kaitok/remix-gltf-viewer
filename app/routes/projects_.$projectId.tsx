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

      <h2>Points</h2>
      <ul>
        <li>Point A</li>
        <li>Point B</li>
        <li>Point C</li>
        <li>Point D</li>
        <li>Point E</li>
      </ul>

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
