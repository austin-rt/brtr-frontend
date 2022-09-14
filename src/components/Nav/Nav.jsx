import './Nav.css'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const Nav = () => {
  let { isAuthenticated } = useContext(UserContext)
  let { logoutUser } = useContext(UserContext)
  return (
    <nav>
      <h1 className="nav__title">
        <NavLink to="/">brtr</NavLink>
      </h1>
      <div className="nav__links">
        <NavLink to="/" className="nav__link">
          home
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className="nav__link">
              profile
            </NavLink>
            <div onClick={logoutUser} className="nav__logout nav__link">
              logout
            </div>
          </>
        ) : (
          <NavLink to="/login" className="nav__link">login</NavLink>
        )}
      </div>
    </nav>
  )
}

export default Nav
