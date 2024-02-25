import { PrismaClient } from '@prisma/client'
import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect } from '@remix-run/react'

export const action = async ({ request }: ActionFunctionArgs) => {
  const prisma = new PrismaClient()
  const formData = await request.formData()

  const title = String(formData.get('title')) || ''
  const project = await prisma.project.create({
    data: {
      title: title,
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
        <button type="submit">Create</button>
      </Form>
    </>
  )
}
