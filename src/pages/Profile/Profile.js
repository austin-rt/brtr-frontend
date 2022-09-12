import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import ProductList from '../../components/ProductList/ProductList'

import UserContext from '../../context/UserContext'

const Profile = () => {
  let { user, isAuthenticated, userDetails } = useContext(UserContext)

  return (
    <div className="container">
      {isAuthenticated ? (
        <>
          <h1>welcome, {user.username}</h1>
          {userDetails.products[0] && (
            <>
              <h2>your listings</h2>
              <ProductList productsFeed={userDetails.products} />
            </>
          )}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  )
}

export default Profile
