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
      <ul>
        {projects.map((v) => {
          return (
            <li>
              <a href={'projects/' + v.id}>{v.title}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
