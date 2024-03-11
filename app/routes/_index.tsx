import type { MetaFunction } from '@remix-run/node'
import { PrismaClient } from '@prisma/client'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [{ title: 'Field' }]
}

export const loader = async () => {
  const prisma = new PrismaClient()
  const projects = await prisma.project.findMany()
  return json({ projects })
}

export default function Index() {
  const { projects } = useLoaderData<typeof loader>()
  return (
    <div>
      <div className="button">
        <a
          href="projects/new"
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          New Project
        </a>
      </div>

      <div className="flex gap-5 mt-2">
        {projects.map((v) => {
          return (
            <a
              href={'projects/' + v.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 min-w-64"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-90">
                {v.title}
              </h5>
              <p className="font-normal text-gray-700">description</p>
            </a>
          )
        })}
      </div>
    </div>
  )
}
