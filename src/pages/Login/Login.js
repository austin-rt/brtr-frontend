import { useContext } from 'react'
import { Navigate, Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const Login = ({ handleChange, formState }) => {
  let { isAuthenticated } = useContext(UserContext)
  let { loginUser } = useContext(UserContext)

  return (
    <div className="container">
      {isAuthenticated ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <h2>
            <Link to="/register">sign up</Link>
          </h2>
          <h2> or login</h2>
          <form onSubmit={(e) => loginUser(e, formState)}>
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
        </>
      )}
    </div>
  )
}

export default Login
