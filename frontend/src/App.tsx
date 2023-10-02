import { Routes, Route } from 'react-router-dom'

import Missing from './pages/missing/Missing'

import Test from './pages/products/Test'

import RegisterForm from './pages/auth/RegisterForm'
import LoginForm from './pages/auth/LoginForm'
import PersistLogin from './pages/auth/components/PersistLogin'
import RequireAuth from './pages/auth/components/RequireAuth'
import { AuthProvider } from './pages/context/AuthProvider'
import RefreshToken from './pages/auth/RefreshToken'

/*
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}
*/

//allowedRoles={[ROLES.User]}
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Missing />} />

          <Route path="/login" element={<LoginForm />} />

          <Route path="/register" element={<RegisterForm />} />
          <Route path="/refresh" element={<RefreshToken />} />
          {/* we want to protect these routes 
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/main" element={<Test />} />
            </Route>
          </Route>
*/}
          {/*
          <Route path="/login" element={<LoginForm />} />
           catch all  <Route path="/test" element={} />*/}
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Routes>
      </AuthProvider>
    </>
  )
}
export default App
