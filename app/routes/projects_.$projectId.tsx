import { PrismaClient } from '@prisma/client'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const prisma = new PrismaClient()
  const project = await prisma.project.findUnique({
    where: {
      id: Number(params.projectId),
    },
  })
  const notes = await prisma.note.findMany({
    where: {
      projectId: Number(params.projectId),
    },
  })
  return json({ project, notes })
}

export default function Project() {
  const { project, notes } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>{project?.title}</h1>

      <div>
        <a href={'/projects/' + project?.id + '/notes/new'}>+new note</a>
      </div>
      <ul>
        {notes.map((v) => {
          return (
            <li>
              <a href={`/projects/${project?.id}/notes/1`}>
                {v.title} {v.createdAt}
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}
