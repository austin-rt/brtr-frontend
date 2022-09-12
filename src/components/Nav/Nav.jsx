import './Nav.css'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const Nav = () => {
  let { isAuthenticated } = useContext(UserContext)
  let { logoutUser } = useContext(UserContext)
  return (
    <div className="container">
      <NavLink to="/" className="nav__link">
        home
      </NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/profile" className="nav__link">
            profile
          </NavLink>
          <div onClick={logoutUser} className="nav__logout">
            logout
          </div>
        </>
      ) : (
        <NavLink to="/login">login</NavLink>
      )}
    </div>
  )
}

export default Nav
