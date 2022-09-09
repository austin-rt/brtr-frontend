import { Navigate } from 'react-router-dom'

const Login = ({ isAuthenticated }) => {
  return (
    <div className="container">
      {isAuthenticated ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <h1>login</h1>
          <form>
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <button className="btn">login</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Login
