import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node'
import { PrismaClient } from '@prisma/client'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { dateFormat } from '~/utils/dateformat'
import LinkButton from '~/components/LinkButton'
import { prisma } from '~/db.server'
import { authenticator } from '~/services/auth.server'
import { getSession } from '~/services/session.server'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [{ title: 'glTF viewer' }]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  let session = await getSession(request.headers.get('Cookie'))
  const projects = await prisma.project.findMany({
    where: { userId: session.data.user.id, deleted: false },
  })
  return json({ projects })
}

export default function Index() {
  const { projects } = useLoaderData<typeof loader>()
  return (
    <div className="py-5 px-8">
      <div className="flex justify-between">
        <h1 className="text-md flex items-center">Projects</h1>

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
            <Link
              to={'projects/' + v.id}
              className="block truncate max-w-sm p-6 border bg-white border-gray-300 rounded-sm min-w-32"
            >
              <h5 className="text-xl tracking-tight text-gray-90">{v.title}</h5>
              <p className="font-normal text-gray-700">{v.description}</p>
              <p> {dateFormat(v.createdAt)}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
