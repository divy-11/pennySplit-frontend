import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { useAppStore } from '../store/useAppStore'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: () => <div>Something went wrong!</div>,
})

function RootComponent() {
  const {user, group} = useAppStore();
  console.log(user,group);
  return (
    <React.Fragment>
      <nav className="flex items-center flex-col gap-2">
      <div>Hello "__root"!</div>
        <ul className="flex justify-center gap-4">
          <li>
             <Link to="/" className="[&.active]:font-bold">Home</Link>
          </li>
          <li>
            <Link to="/main" className="[&.active]:font-bold">Main</Link>
          </li>
          <li>
            <Link to="/about" className="[&.active]:font-bold">About</Link>
          </li>
          <li>
            <Link to="/products" className="[&.active]:font-bold">Products</Link>
            </li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        </nav>
        <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
    </React.Fragment>
  )
}
