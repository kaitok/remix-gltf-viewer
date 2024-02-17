import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const note = params.noteId
  return json({ note })
}

export default function Note() {
  const { note } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>Note {note}</h1>
      <p>note</p>
    </>
  )
}
