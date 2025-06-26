import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
  defaultPreload: 'intent',
})

function RouteComponent() {
  return <div>Hello "/about"!</div>
}
