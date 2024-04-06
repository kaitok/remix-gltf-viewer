import { PrismaClient } from '@prisma/client'
import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect } from '@remix-run/react'
import Button from '~/components/Button'
import {
  json,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  NodeOnDiskFile,
} from '@remix-run/node'
import { prisma } from '~/db.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 1024 * 1024 * 1024,
      directory: './public/models',
      file: ({ filename }) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  )

  // get form data
  const formData = await unstable_parseMultipartFormData(request, uploadHandler)
  let file = formData.get('file') as NodeOnDiskFile
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  // Register to db
  const project = await prisma.project.create({
    data: {
      title: title,
      description: description,
      objectURL: file.name,
      userId: '1',
    },
  })
  return redirect('/projects/' + project.id)
}

export default function New() {
  return (
    <>
      <div className="py-5 px-8">
        <h1 className="text-2xl">New Project</h1>

        <div className="max-w-xl mt-5">
          <Form method="POST" encType="multipart/form-data">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="rounded-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="rounded-sm  p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file"
              >
                Upload file
              </label>

              <input
                type="file"
                aria-describedby="file"
                id="file"
                name="file"
                className="rounded-sm text-sm text-stone-500 w-full bg-gray-50 border cursor-pointer border-gray-300 file:mr-5 file:py-2 file:px-3 file:text-xs file:font-medium file:bg-black file:border-none file:text-white hover:file:cursor-pointer hover:file:bg-gray-800 hover:file:text-gray-200"
                required
              />
              <div className="mt-1 text-sm text-gray-500" id="file">
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
      </div>
    </>
  )
}
