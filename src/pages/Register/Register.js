import { useContext } from 'react'
import { Navigate, Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const Register = ({ handleChange, formState }) => {
  let { isAuthenticated } = useContext(UserContext)
  let { registerUser } = useContext(UserContext)

  return (
    <div className="container">
      {isAuthenticated ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <h2>
            <Link to="/login">login</Link>
          </h2>
          <h2>or sign up</h2>
          <form onSubmit={(e) => registerUser(e, formState)}>
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
            <button className="btn">sign up</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Register
