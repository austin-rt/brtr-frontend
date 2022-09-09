import { NavLink } from 'react-router-dom'

const Nav = ({ user, isAuthenticated }) => {
  return (
    <div className="container">
      <NavLink to="/">home</NavLink>
      {isAuthenticated ? (
        <NavLink to="/profile">profile</NavLink>
      ) : (
        <NavLink to="/login">login</NavLink>
      )}
    </div>
  )
}

export default Nav
