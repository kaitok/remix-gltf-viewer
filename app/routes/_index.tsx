import type { MetaFunction } from '@remix-run/node'
import { PrismaClient } from '@prisma/client'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { dateFormat } from '~/utils/dateformat'
import LinkButton from '~/components/LinkButton'

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
    <div className="mt-5">
      <div className="button">
        <LinkButton href="projects/new" bgColor="black" textColor="white">
          New Project
        </LinkButton>
      </div>

      <div className="flex gap-5 mt-10">
        {projects.map((v) => {
          return (
            <a
              href={'projects/' + v.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-sm shadow hover:bg-gray-100 min-w-64"
            >
              <h5 className="mb-2 text-xl tracking-tight text-gray-90">
                {v.title}
              </h5>
              <p className="font-normal text-gray-700">description</p>
              <p> {dateFormat(v.createdAt)}</p>
            </a>
          )
        })}
      </div>
    </div>
  )
}
