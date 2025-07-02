import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Products/$pid')({
  component: RouteComponent,
})

function RouteComponent() {
    const {pid} = Route.useParams()
  return <div>Hello "/Products/$pid"!
    <h2>This is my product id: {pid}</h2>
  </div>
}
