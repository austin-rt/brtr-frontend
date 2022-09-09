import { Navigate } from 'react-router-dom'

const Profile = ({ user, isAuthenticated }) => {
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
