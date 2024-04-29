import { PrismaClient } from '@prisma/client'
import { json, redirect } from '@remix-run/node'
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, useSubmit, useRevalidator } from '@remix-run/react'
import Model from '~/components/model'
import Button from '~/components/Button'
import { useState, useRef, useEffect } from 'react'
import ConfirmModal from '~/components/ConfirmModal'
import Back from '~/components/Back'
import { prisma } from '~/db.server'
import { getSession } from '~/services/session.server'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'
import type { JsonValue } from '@prisma/client/runtime/library'
import { Vector3, Euler } from 'three'

type ViewPoint = {
  id: string
  title: string
  content: string | null
  position: JsonValue
  rotation: JsonValue
  projectId: string
  authorId: string
  deleted: boolean
  createdAt: Date
  updatedAt: Date
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const projectId = params.projectId
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  })
  const notes: ViewPoint[] = await prisma.note.findMany({
    where: {
      projectId,
      deleted: false,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return typedjson({ project, notes, projectId })
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const projectId = params.projectId
  if (!projectId) return

  const formData = await request.formData()

  if (formData.get('intent') === 'create') {
    let session = await getSession(request.headers.get('Cookie'))
    await prisma.note.create({
      data: {
        title: '',
        projectId: projectId,
        authorId: session.data.user.id,
        position: (formData.get('position') as JsonValue) || '',
        rotation: (formData.get('rotation') as JsonValue) || '',
      },
    })
  } else if (formData.get('intent') === 'update note') {
    await prisma.note.update({
      where: {
        id: formData.get('id') || '',
      },
      data: {
        title: formData.get('title') || '',
        content: formData.get('content') || '',
      },
    })
  } else if (formData.get('intent') === 'delete note') {
    await prisma.note.update({
      where: {
        id: formData.get('id') || '',
      },
      data: {
        deleted: true,
      },
    })
  } else {
    await deleteNotes(projectId)
    await deleteProject(projectId)
    return redirect('/')
  }
  return null
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
  // データを取得
  const { project, notes, projectId } = useTypedLoaderData()
  const submit = useSubmit()
  const revalidator = useRevalidator()
  const cameraControlRef = useRef()
  const [editMode, setEditMode] = useState(notes.map(() => false)) // 編集状態を管理
  const inputRefs = useRef(notes.map(() => null)) // inputフィールドの参照
  const textareaRefs = useRef(notes.map(() => null)) // textareaフィールドの参照
  const [open, setOpen] = useState(false)
  const handleClickDelete = () => {
    setOpen(true)
  }

  const handleNoteClick = (viewPoint: any) => {
    if (cameraControlRef.current) {
      const cameraControls = cameraControlRef.current
      const parsedPosition = JSON.parse(viewPoint.position)
      const parsedRotation = JSON.parse(viewPoint.rotation)

      const position = new Vector3(
        parsedPosition.x,
        parsedPosition.y,
        parsedPosition.z
      )
      const rotation = new Euler(
        parsedRotation._x,
        parsedRotation._y,
        parsedRotation._z,
        parsedRotation._order
      )

      const offset = new Vector3(1, 0, 0).applyEuler(rotation)
      const cameraPosition = position.clone().add(offset)

      cameraControls.setPosition(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        true
      )
      cameraControls.camera.rotation.copy(rotation)
    } else {
      console.error('CameraControls reference is not set')
    }
  }

  const handleSave = (index) => {
    // 編集モードを解除
    setEditMode((prev) => {
      const newEditMode = [...prev]
      newEditMode[index] = false
      return newEditMode
    })

    const title = inputRefs.current[index].value
    const content = textareaRefs.current[index].value

    // submitを使ってデータを更新
    submit(
      {
        id: notes[index].id,
        title,
        content,
        intent: 'update note',
      },
      { method: 'post' }
    )

    // データの再取得
    revalidator.revalidate()
  }

  const handleDelete = (index) => {
    // submitを使ってデータを削除
    submit(
      {
        id: notes[index].id,
        intent: 'delete note',
      },
      { method: 'post' }
    )

    // データの再取得
    revalidator.revalidate()
  }

  const handleEdit = (index) => {
    // 編集モードをオン
    setEditMode((prev) => {
      const newEditMode = [...prev]
      newEditMode[index] = true
      return newEditMode
    })
  }

  const handleCancel = (index) => {
    // 編集モードをオフ
    setEditMode((prev) => {
      const newEditMode = [...prev]
      newEditMode[index] = false
      return newEditMode
    })
  }

  const registerNote = async (position: any, rotation: any) => {
    submit(
      {
        position: JSON.stringify(position),
        rotation: JSON.stringify(rotation),
        intent: 'create',
      },
      { method: 'post' }
    )
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

        <div className="px-6 py-2 flex flex-row justify-between w-full items-center">
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
              style={{ backgroundColor: '#fafafa' }}
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
              color: 'white',
              maxWidth: '400px',
              minWidth: '300px',
              height: '88vh',
              overflow: 'scroll',
              paddingBottom: '50px',
            }}
            className="flex flex-col gap-5 pt-20"
          >
            {notes.map((note, index) => (
              <div
                key={index}
                className="ml-5 px-5 bg-white border-gray-200 border-b-[1px] text-black py-5"
                onClick={() => handleNoteClick(note)}
              >
                {editMode[index] ? (
                  <div className="flex flex-row-reverse gap-1">
                    <Button
                      size="xs"
                      textColor="white"
                      bgColor="black"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </Button>
                    <Button
                      size="xs"
                      textColor="black"
                      bgColor="white"
                      onClick={() => handleCancel(index)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-row-reverse gap-1">
                    <Button
                      size="xs"
                      textColor="white"
                      bgColor="black"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      textColor="black"
                      bgColor="white"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <div className="flex flex-col gap-1 pt-1">
                  {editMode[index] ? (
                    <>
                      <input
                        ref={(ref) => {
                          inputRefs.current[index] = ref
                        }}
                        defaultValue={note.title || ''}
                        placeholder="Title"
                        className="border border-gray-200 border-b-[1px] p-1 text-sm w-full"
                      />
                      <textarea
                        ref={(ref) => {
                          textareaRefs.current[index] = ref
                        }}
                        defaultValue={note.content || ''}
                        placeholder="Content"
                        style={{ height: '100px' }}
                        className="border border-gray-200 border-b-[1px] p-1 text-sm w-full"
                      />
                    </>
                  ) : (
                    <>
                      <div>{note.title || 'No Title'}</div>
                      <div>{note.content || 'No Content'}</div>
                    </>
                  )}
                  <div style={{ fontSize: '10px', paddingTop: '5px' }}>
                    <div>
                      createdAt: {new Date(note.createdAt).toLocaleString('ja')}
                    </div>
                    <div>
                      updatedAt: {new Date(note.updatedAt).toLocaleString('ja')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Model
            filename={project?.objectURL || ''}
            cameraControlRef={cameraControlRef}
            viewPoints={notes}
            registerNote={registerNote}
          />
        </div>
      </div>
    </>
  )
}
