import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import jwt_decode from 'jwt-decode'
//{ allowedRoles }: any
const RequireAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()
  const decoded: any = auth?.accessToken
    ? jwt_decode(auth.accessToken.toString())
    : undefined
  /* const roles = decoded?.UserInfo?.roles || []
  return roles?.find((role: any) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )*/

  if (decoded) {
    return <Outlet />
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}

export default RequireAuth
