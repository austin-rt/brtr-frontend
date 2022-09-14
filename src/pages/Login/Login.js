import './Login.css'

import { useContext } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const Login = ({ handleChange, formState, setFormState, initialFormState }) => {
  let { isAuthenticated, LoginUser } = useContext(UserContext)
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()
    await LoginUser(formState)
    setFormState(initialFormState)
    navigate('/profile')
  }

  return (
    <div className="container login__container">
      {isAuthenticated ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <div className="login__header-container">
            <h1 className="login__hero-header">login</h1>
          </div>
          <div className="login__form-container">
            <form onSubmit={loginUser}>
              <input
                type="text"
                id="username"
                placeholder="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                type="password"
                id="password"
                placeholder="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn">login</button>
            </form>
          </div>
          <div className="login__register-container">
            <h1 className="login__register">
              <Link to="/register">register</Link>
            </h1>
            <button className="btn login__guest-btn">continue as guest</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Login
