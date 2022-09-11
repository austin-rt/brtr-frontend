import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const UserContext = createContext()

export default UserContext

const BASE_URL = process.env.REACT_APP_BASE_URL

export const UserProvider = ({ children }) => {
  const navigate = useNavigate()

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null
  )
  const [isAuthenticated, toggleAuthenticated] = useState(() =>
    localStorage.getItem('authTokens') ? true : false
  )

  const registerUser = async (e, input) => {
    e.preventDefault()

    // navigate('/login')
  }

  const loginUser = async (e, input) => {
    e.preventDefault()
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...input })
    }
    let res = await fetch(`${BASE_URL}/token/`, payload)
    let data = await res.json('res:')
    if (res.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      toggleAuthenticated(true)
      navigate('/profile')
      localStorage.setItem('authTokens', JSON.stringify(data))
    } else {
      console.log('oops')
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    toggleAuthenticated(false)
    navigate('/login')
  }

  const refreshToken = async () => {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      refresh: JSON.stringify(authTokens, refresh)
    }
    // let res = await fetch(`${BASE_URL}/token/refresh/`, payload)
    // let data = await res.json('res:')
    console.log(payload.refresh)
  }

  const data = {
    user: user,
    isAuthenticated: isAuthenticated,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}
