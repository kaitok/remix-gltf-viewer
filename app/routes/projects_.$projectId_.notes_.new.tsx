import { PrismaClient } from '@prisma/client'
import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect } from '@remix-run/react'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const prisma = new PrismaClient()
  const formData = await request.formData()

  if (params.projectId === undefined) {
    return redirect('/projects/')
  }

  const title = String(formData.get('title')) || ''
  const note = await prisma.note.create({
    data: {
      title: title,
      projectId: Number(params.projectId),
      authorId: 1,
    },
  })
  return redirect('/projects/' + Number(params.projectId))
}

export default function New() {
  return (
    <>
      <h1>New Note</h1>
      <Form method="post">
        <input type="text" name="title" placeholder="title" />
        <button type="submit">Create</button>
      </Form>
    </>
  )
}
