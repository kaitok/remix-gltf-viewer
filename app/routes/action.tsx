import { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/react'
import {
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
  NodeOnDiskFile,
} from '@remix-run/node'

export const action = async ({ request }: ActionFunctionArgs) => {
  // let formData = await unstable_parseMultipartFormData(
  //   request,
  //   unstable_composeUploadHandlers(
  //     unstable_createFileUploadHandler({
  //       // Store the images in the public/img folder
  //       directory: './public/model',
  //       // By default, `unstable_createFileUploadHandler` adds a number to the file
  //       // names if there's another with the same name; by disabling it, we replace
  //       // the old file
  //       avoidFileConflicts: false,
  //       // Use the actual filename as the final filename
  //       file({ filename }) {
  //         return filename
  //       },
  //       // Limit the max size to 1GB
  //       maxPartSize: 1024 * 1024 * 1024,
  //     }),
  //     unstable_createMemoryUploadHandler()
  //   )
  // )
  console.log('action')

  const uploadHandler = unstable_createFileUploadHandler({
    directory: './public/models',
    file: ({ filename }) => filename,
  })

  const formData = await unstable_parseMultipartFormData(request, uploadHandler)

  let files = formData.getAll('file') as NodeOnDiskFile[]
  console.log(files)
  // return json({
  //   files: files.map((file) => ({ name: file.name, url: `/img/${file.name}` })),
  // })
  // get params
  const title = String(formData.get('title')) || ''
  const description = String(formData.get('description')) || ''

  // register to db
  // const prisma = new PrismaClient()
  // const project = await prisma.project.create({
  //   data: {
  //     title: title,
  //     description: description,
  //     objectURL: 'test url',
  //     userId: 1,
  //   },
  // })
  return redirect('/projects/' + project.id)
}
