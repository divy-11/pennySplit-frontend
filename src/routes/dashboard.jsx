import { createFileRoute } from '@tanstack/react-router';
import authService from '../api/authService';
import { useAppStore } from '../store/useAppStore';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await useAppStore.getState().user;
    console.log('User in dashboard:', user);
    if (!user) {
      window.location.href = '/login';
    }
  }
})

function RouteComponent() {
const handleLogout = (event) => {
    event.preventDefault();
    authService.logout();
    
    window.location.href = '/';
}

return <div>Hello "/dashboard"!
    <button onClick={handleLogout} className="btn btn-primary">
    Logout
    </button>

  </div>
}
