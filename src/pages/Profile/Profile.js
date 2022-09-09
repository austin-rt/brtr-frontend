import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import UserContext from '../../context/UserContext'

const Profile = () => {
  let { user } = useContext(UserContext)
  let { isAuthenticated } = useContext(UserContext)
  return (
    <div className="container">
      {isAuthenticated ? (
        <h1>welcome, {user.username}</h1>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  )
}

export default Profile
