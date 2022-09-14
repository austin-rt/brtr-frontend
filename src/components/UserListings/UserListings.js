import { useContext } from 'react'

import UserContext from '../../context/UserContext'
import ProductList from '../ProductList/ProductList'

const UserListings = () => {
  let { userDetails } = useContext(UserContext)

  return (
    <div className="container">
      {userDetails.products.length > 0 ? (
        <>
          <h2>your listings</h2>
          <ProductList productsFeed={userDetails.products} />
        </>
      ) : (
        <>
          <h2>you have no active listings</h2>
        </>
      )}
    </div>
  )
}

export default UserListings
