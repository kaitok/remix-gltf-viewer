import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div>
      <h1>Projects</h1>

      <ul>
        <li>
          <a href="projects/1">test project1</a>
        </li>
        <li>
          <a href="projects/2">test project2</a>
        </li>
      </ul>
    </div>
  )
}
