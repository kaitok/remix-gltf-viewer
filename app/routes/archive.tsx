import { PrismaClient } from '@prisma/client'
import { json } from '@remix-run/node'
import type { MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData, useSubmit } from '@remix-run/react'
import { dateFormat } from '~/utils/dateformat'
import Back from '~/components/Back'
import { useState } from 'react'
import Button from '~/components/Button'
import ConfirmModal from '~/components/ConfirmModal'
import { prisma } from '~/db.server'

export const meta: MetaFunction = () => {
  return [{ title: 'Archives | Field' }]
}

export const loader = async () => {
  const projects = await prisma.project.findMany({ where: { deleted: true } })
  return json({ projects })
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const checkedItems: string = String(formData.get('checkedItems'))
  if (!checkedItems) return

  let projectIds: string[] = []
  projectIds = checkedItems.split(',')

  if (formData.get('intent') === 'restore') {
    projectIds.map(async (projectId) => {
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          deleted: false,
        },
      })
      await prisma.note.updateMany({
        where: {
          projectId: projectId,
        },
        data: {
          deleted: false,
        },
      })
    })
  } else if (formData.get('intent') === 'delete') {
    projectIds.map(async (projectId) => {
      await prisma.note.deleteMany({
        where: {
          projectId: projectId,
        },
      })
      await prisma.project.delete({
        where: {
          id: projectId,
        },
      })
    })
  }

  return redirect('/archive')
}

export default function Archives() {
  const { projects } = useLoaderData<typeof loader>()
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const submit = useSubmit()

  const handleCheckboxChange = (index: string) => {
    const newCheckedItems: string[] = [...checkedItems]
    if (newCheckedItems.includes(index)) {
      newCheckedItems.splice(newCheckedItems.indexOf(index), 1)
    } else {
      newCheckedItems.push(index)
    }
    setCheckedItems(newCheckedItems)
  }

  const handleRestoreProject = () => {
    submit({ checkedItems, intent: 'restore' }, { method: 'post' })
  }

  const handleDeleteProject = () => {
    submit({ checkedItems, intent: 'delete' }, { method: 'post' })
  }

  const selectAll = () => {
    if (isSelectedAll) {
      setCheckedItems([])
    } else {
      const allProjectIds: string[] = projects.map((v) => v.id)
      setCheckedItems(allProjectIds)
    }
    setIsSelectedAll(!isSelectedAll)
  }

  return (
    <>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        title="Are you sure you want to delete this projects?"
        description="This project will be deleted immediately, You can't undo this action."
        execButtonTitle="Delete"
      />
      <div className="p-8">
        <Back href="/" label="Projects" />

        <div className="mt-3">
          <div className="flex justify-between">
            <h1 className="text-lg flex items-center">
              <span className="text-xl">Archives</span>
            </h1>
            <div className="flex gap-3">
              <Button bgColor="white" textColor="black" onClick={selectAll}>
                {isSelectedAll ? 'Cancel' : 'Select All'}
              </Button>
              <Button
                bgColor="black"
                textColor="white"
                disabled={checkedItems.length === 0}
                onClick={handleRestoreProject}
              >
                Restore Project
              </Button>
              <Button
                bgColor="red"
                textColor="white"
                disabled={checkedItems.length === 0}
                onClick={handleDeleteProject}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 mt-5">
            {projects.map((v) => {
              return (
                <div
                  key={v.id}
                  className="max-w-sm p-6 bg-white border border-gray-200 rounded-sm shadow hover:bg-gray-100 min-w-32 flex items-center cursor-pointer"
                  onClick={() => handleCheckboxChange(v.id)}
                >
                  <div className="flex items-baseline">
                    <div>
                      <input
                        type="checkbox"
                        className="mr-2"
                        id={`checkbox-${v.id}`}
                        checked={checkedItems.includes(v.id)}
                      />
                    </div>
                    <div>
                      <h5 className="text-xl tracking-tight text-gray-90">
                        {v.title}
                      </h5>
                      <p className="font-normal text-gray-700">
                        {v.description}
                      </p>
                      <p>{dateFormat(v.createdAt)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
