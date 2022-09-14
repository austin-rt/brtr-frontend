import './Register.css'

import { useContext } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const Register = ({
  handleChange,
  formState,
  setFormState,
  initialFormState
}) => {
  let { isAuthenticated, RegisterUser } = useContext(UserContext)
  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault()
    await RegisterUser(formState)
    setFormState(initialFormState)
    navigate('/login')
  }

  return (
    <div className="container register__container">
      {isAuthenticated ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <h1>register</h1>
          <div className="register__form-container">
            <form className="register__form" onSubmit={registerUser}>
              <input
                type="text"
                id="username"
                placeholder="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                type="email"
                id="email"
                placeholder="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                type="password"
                id="password"
                placeholder="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn">sign up</button>
            </form>
          </div>
          <h1 className="register__login">
            <Link to="/login">login</Link>
          </h1>
          <div className="register__button-container">
            <button className="btn register__guest-btn">
              continue as guest
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Register
