import { PrismaClient } from '@prisma/client'
import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect } from '@remix-run/react'

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
      <h1>New Project</h1>
      <Form method="post">
        <input type="text" name="title" placeholder="title" />
        <input type="text" name="description" placeholder="description" />
        <button type="submit">Create</button>
      </Form>
    </>
  )
}
