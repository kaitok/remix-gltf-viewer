import { PrismaClient } from '@prisma/client'
import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect } from '@remix-run/react'
import Button from '~/components/Button'

export const action = async ({ request }: ActionFunctionArgs) => {
  const prisma = new PrismaClient()
  const formData = await request.formData()

  const title = String(formData.get('title')) || ''
  const description = String(formData.get('description')) || ''
  const project = await prisma.project.create({
    data: {
      title: title,
      description: description,
      objectURL: 'test url',
      userId: 1,
    },
  })
  return redirect('/projects/' + project.id)
}

export default function New() {
  return (
    <>
      <div className="mt-5">
        <h1 className="text-2xl">New Project</h1>
      </div>
      <div className="max-w-xl mt-5">
        <Form method="post">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              description
            </label>
            <textarea
              id="message"
              rows={4}
              className="rounded-sm  p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file"
            >
              Upload file
            </label>

            <input
              type="file"
              aria-describedby="file"
              id="file"
              required
              className="rounded-sm text-sm text-stone-500 w-full bg-gray-50 border cursor-pointer border-gray-300 file:mr-5 file:py-2 file:px-3 file:text-xs file:font-medium file:bg-black file:border-none file:text-white hover:file:cursor-pointer hover:file:bg-gray-800 hover:file:text-gray-200"
            />
            <div
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file"
            >
              only support glTF format
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" bgColor="black" textColor="white">
              Create Project
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
