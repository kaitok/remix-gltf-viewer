import type { MetaFunction } from '@remix-run/node'
import { PrismaClient } from '@prisma/client'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { dateFormat } from '~/utils/dateformat'
import LinkButton from '~/components/LinkButton'
import Back from '~/components/Back'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    console.log('changed:', checkedItems)
  }, [checkedItems])

  // Function to handle checkbox change
  const handleCheckboxChange = (index: number) => {
    // Create a copy of the checkedItems array
    const newCheckedItems: number[] = [...checkedItems]
    // Toggle the checked status for the checkbox at the given index
    if (newCheckedItems.includes(index)) {
      newCheckedItems.splice(newCheckedItems.indexOf(index), 1)
    } else {
      newCheckedItems.push(index)
    }
    // Update the state with the new checkedItems array
    setCheckedItems(newCheckedItems)
  }
  return (
    <div className="mt-5">
      <h1 className="text-lg flex items-center">
        <Back href="/" />
        <h2 className="text-xl">Deleted Projects</h2>
      </h1>

      <div className="flex gap-5 mt-4">
        {projects.map((v) => {
          return (
            <div
              key={v.id}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-sm shadow hover:bg-gray-100 min-w-64 flex items-center cursor-pointer"
              onClick={() => handleCheckboxChange(v.id)}
            >
              <div>
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
                    <h5 className="mb-2 text-xl tracking-tight text-gray-90">
                      {v.title}
                    </h5>
                    <p className="font-normal text-gray-700">{v.description}</p>
                    <p>{dateFormat(v.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
