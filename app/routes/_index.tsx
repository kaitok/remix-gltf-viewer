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
  const projects = await prisma.project.findMany({ where: { deleted: false } })
  return json({ projects })
}

export default function Index() {
  const { projects } = useLoaderData<typeof loader>()
  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <h1 className="text-lg flex items-center">
          <span className="text-xl">Projects</span>
        </h1>

        <div className="flex flex-row items-baseline gap-2">
          <LinkButton
            className="w-20"
            href="archive"
            bgColor="white"
            textColor="gray-800"
            size="sm"
          >
            Archives
          </LinkButton>
          <LinkButton
            className="w-32"
            href="projects/new"
            bgColor="black"
            textColor="white"
          >
            New Project
          </LinkButton>
        </div>
      </div>
      <div className="flex gap-3 items-end"></div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {projects.map((v) => {
          return (
            <a
              href={'projects/' + v.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-sm shadow hover:bg-gray-100 min-w-32"
            >
              <h5 className="text-xl tracking-tight text-gray-90">{v.title}</h5>
              <p className="font-normal text-gray-700">{v.description}</p>
              <p> {dateFormat(v.createdAt)}</p>
            </a>
          )
        })}
      </div>
    </div>
  )
}
