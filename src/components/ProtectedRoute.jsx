import { Navigate, Outlet } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')

  if (!token || !userStr) {
    if (allowedRole === 'admin') {
      return <Navigate to="/admin/login" replace />
    }
    if (allowedRole === 'student') {
      return <Navigate to="/student/login" replace />
    }
    return <Navigate to="/" replace />
  }

  const user = JSON.parse(userStr)

  if (allowedRole && user.role !== allowedRole) {
    toast.error('Unauthorized access.')
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
