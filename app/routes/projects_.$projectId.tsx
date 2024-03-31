import { PrismaClient } from '@prisma/client'
import { json, redirect } from '@remix-run/node'
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import Model from '~/components/model'
import { dateFormat } from '~/utils/dateformat'
import Button from '~/components/Button'
import LinkButton from '~/components/LinkButton'
import { useState, useRef } from 'react'
import ConfirmModal from '~/components/ConfirmModal'
import Back from '~/components/Back'
import { prisma } from '~/db.server'

import {
  Environment,
  Stats,
  OrbitControls,
  Circle,
  Gltf,
  useGLTF,
} from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'
import { Suspense } from 'react'
import model from '../models/scene2.glb'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const projectId = Number(params.projectId)
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  })
  const notes = await prisma.note.findMany({
    where: {
      projectId,
    },
  })
  return json({ project, notes, projectId })
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const projectId = Number(params.projectId)
  await deleteNotes(projectId)
  await deleteProject(projectId)
  return redirect('/')
}

const deleteProject = async (projectId: number) => {
  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      deleted: true,
    },
  })
}

const deleteNotes = async (projectId: number) => {
  await prisma.note.updateMany({
    where: {
      projectId: projectId,
    },
    data: {
      deleted: true,
    },
  })
}

export default function Project() {
  const { project, notes, projectId } = useLoaderData<typeof loader>()

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const handleClickDelete = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="mt-4">
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          title="Are you sure you want to delete this project?"
          description="This project will be deleted immediately, You can't undo this action."
          execButtonTitle="Delete"
        />

        <Back href="/" label="projects" />
        <div className="flex flex-row gap-8 mt-2 ml-3">
          <div className="basis-1/3 flex flex-col gap-3 min-w-96">
            <div className="flex flex-col">
              <div className="flex justify-between mt-2">
                <div className="flex flex-col">
                  <h2 className="text-3xl">{project?.title}</h2>
                  <p className="text-3xl">{project?.description}</p>
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
                <p className="text-l pt-2">{project?.description}</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl">Notes</h2>
                </div>
                <div>
                  <LinkButton
                    size="sm"
                    href={'/projects/' + project?.id + '/notes/new'}
                    textColor="white"
                    bgColor="black"
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
