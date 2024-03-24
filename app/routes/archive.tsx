import type { MetaFunction } from '@remix-run/node'
import { PrismaClient } from '@prisma/client'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { dateFormat } from '~/utils/dateformat'
import LinkButton from '~/components/LinkButton'
import Back from '~/components/Back'
import { useState } from 'react'
import Button from '~/components/Button'

export const meta: MetaFunction = () => {
  return [{ title: 'Field' }]
}

export const loader = async () => {
  const prisma = new PrismaClient()
  const projects = await prisma.project.findMany({ where: { deleted: true } })
  return json({ projects })
}

export default function Index() {
  const { projects } = useLoaderData<typeof loader>()
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems: number[] = [...checkedItems]
    if (newCheckedItems.includes(index)) {
      newCheckedItems.splice(newCheckedItems.indexOf(index), 1)
    } else {
      newCheckedItems.push(index)
    }
    setCheckedItems(newCheckedItems)
  }

  const selectAll = () => {
    if (isSelectedAll) {
      setCheckedItems([])
    } else {
      const allProjectIds: number[] = projects.map((v) => v.id)
      setCheckedItems(allProjectIds)
    }
    setIsSelectedAll(!isSelectedAll)
  }
  return (
    <>
      <div className="mt-5">
        <Back href="/" label="Projects" />
      </div>
      <div className="mt-3">
        <div className="flex justify-between">
          <h1 className="text-lg flex items-center">
            <span className="text-xl">Archives</span>
          </h1>
          <div>
            <Button bgColor="white" textColor="black" onClick={selectAll}>
              {isSelectedAll ? 'Cancel' : 'Select All'}
            </Button>
            <Button
              bgColor="red"
              textColor="white"
              disabled={checkedItems.length === 0}
            >
              Delete Project
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
                    <p className="font-normal text-gray-700">{v.description}</p>
                    <p>{dateFormat(v.createdAt)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
