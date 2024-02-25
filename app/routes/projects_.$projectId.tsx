import { PrismaClient } from '@prisma/client'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Outlet } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const prisma = new PrismaClient()
  const project = await prisma.project.findUnique({
    where: {
      id: Number(params.projectId),
    },
  })
  return json({ project })
}

export default function Project() {
  const { project } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>{project?.title}</h1>

      <ul>
        <li>
          <a href={`/projects/${project?.id}/notes/1`}>Notes 1</a>
        </li>
      </ul>
    </>
  )
}
