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
      <h1>Projects</h1>

      <div>
        <a href="projects/new">+new project</a>
      </div>

      <div className="flex flex-col gap-5">
        {projects.map((v) => {
          return (
            <a
              href={'projects/' + v.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
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
