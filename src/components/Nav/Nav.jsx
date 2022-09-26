import './Nav.css'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { useCart } from '../../context/CartContext'

const Nav = () => {
  let { logoutUser, isAuthenticated } = useContext(UserContext)
  const cartItems = useCart()
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
          <NavLink to="/login" className="nav__link">
            login
          </NavLink>
        )}
      </div>
      <NavLink to="/cart" className="nav__link">
        cart
        {cartItems.length > 0 ? ` (${cartItems.length})` : ``}
      </NavLink>
    </nav>
  )
}

export default Nav
