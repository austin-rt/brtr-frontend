import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const Nav = () => {
  let { isAuthenticated } = useContext(UserContext)
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
