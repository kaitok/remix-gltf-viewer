import { PrismaClient } from '@prisma/client'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import Model from '~/components/model'
import { dateFormat } from '~/utils/dateformat'
import Button from '~/components/Button'
import LinkButton from '~/components/LinkButton'
import { useState, useRef } from 'react'
import ConfirmModal from '~/components/ConfirmModal'

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
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const handleClickDelete = () => {
    setOpen(true)
  }

  const handleDelete = () => {
    // TODO delete project by prisma
    navigate('/')
  }

  return (
    <>
      <div className="mt-5">
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          title="Are you sure you want to delete this project?"
          description="This project will be deleted immediately, You can't undo this action."
          execButtonTitle="Delete"
          handleExecButton={handleDelete}
        />
        <div className="flex flex-row gap-8">
          <div className="basis-1/3 flex flex-col gap-3 min-w-96">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h2 className="text-3xl">{project?.title}</h2>
                  <p className="text-l">{dateFormat(project?.updatedAt)}</p>
                </div>
                <div className="pt-1 flex gap-1">
                  <Button
                    size="sm"
                    textColor="black"
                    bgColor="white"
                    border={true}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    textColor="white"
                    bgColor="red"
                    onClick={handleClickDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-l pt-2">
                  description asdfjwoein spodcpowenp npcwiepeinp npcwiencpiwe p
                  inwpeincwpeinpweicnwpeinkcn wpenfpekcn asdfcwn pwneicnpwien.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl">Notes</h2>
                </div>
                <div>
                  <LinkButton
                    size="sm"
                    href={'/projects/' + project?.id + '/notes/new'}
                    textColor="white"
                    bgColor="gray"
                  >
                    New
                  </LinkButton>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {notes.map((v) => {
                return (
                  <a
                    href={`/projects/${project?.id}/notes/1`}
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-sm shadow hover:bg-gray-100 min-w-64"
                  >
                    <p className="text-lg">{v.title}</p>
                    {dateFormat(v.createdAt)}
                  </a>
                )
              })}
            </div>
          </div>
          <div className="basis-2/3 bg-gray-200">
            <Model />
          </div>
        </div>
      </div>
    </>
  )
}
