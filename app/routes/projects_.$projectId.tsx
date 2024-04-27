import { PrismaClient } from '@prisma/client'
import { json, redirect } from '@remix-run/node'
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import Model from '~/components/model'
import Button from '~/components/Button'
import { useState, useRef } from 'react'
import ConfirmModal from '~/components/ConfirmModal'
import Back from '~/components/Back'
import { prisma } from '~/db.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const projectId = params.projectId
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
  const projectId = params.projectId
  if (!projectId) return
  await deleteNotes(projectId)
  await deleteProject(projectId)
  return redirect('/')
}

const deleteProject = async (projectId: string) => {
  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      deleted: true,
    },
  })
}

const deleteNotes = async (projectId: string) => {
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

  const cameraControlRef = useRef()
  const [spheres, setSpheres] = useState([]) // Sphereの位置

  const registerNote = (position: any, rotation: any) => {
    console.log('register', position, rotation)
  }

  return (
    <>
      <div>
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          title="Are you sure you want to delete this project?"
          description="This project will be deleted immediately, You can't undo this action."
          execButtonTitle="Delete"
        />

        <div className="px-6 py-5 flex flex-row justify-between w-full items-center">
          <div className="flex flex-row gap-10">
            <Back href="/" label="projects" />
            <div className="flex flex-col">
              <h2 className="text-md">{project?.title}</h2>
              <p className="text-sm">{project?.description}</p>
            </div>
          </div>

          <div className="pt-1 flex gap-1">
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

        <div style={{ height: '88vh' }}>
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              backgroundColor: 'rgb(59 59 59 / 83%)',
              color: 'white',
              height: '88vh',
              maxWidth: '250px',
            }}
            className="flex flex-col gap-10 pt-20"
          >
            {spheres.map((s: any) => {
              {
                console.log(s.position)
              }
              return (
                <div className="px-5">
                  <div>title</div>
                  <div style={{ overflowWrap: 'anywhere' }}>
                    contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
                  </div>
                  <div>{s.position}</div>
                </div>
              )
            })}
          </div>
          <Model
            filename={project?.objectURL || ''}
            cameraControlRef={cameraControlRef}
            spheres={spheres}
            setSpheres={setSpheres}
            registerNote={registerNote}
          />
        </div>
      </div>
    </>
  )
}
