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
      <div className="mt-10">
        <h1 className="text-4xl">{project?.title}</h1>
        <p className="text-l">description</p>

        <div className="mt-10">
          <a
            href={'/projects/' + project?.id + '/notes/new'}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            +new note
          </a>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          {notes.map((v) => {
            return (
              <a
                href={`/projects/${project?.id}/notes/1`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 min-w-64"
              >
                <p className="text-lg">{v.title}</p> {v.createdAt}
              </a>
            )
          })}
        </div>
      </div>
    </>
  )
}
