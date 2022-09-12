import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const UserContext = createContext()

export default UserContext

const BASE_URL = process.env.REACT_APP_BASE_URL

export const UserProvider = ({ children }) => {
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState(null)
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
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, toggleAuthenticated] = useState(() =>
    localStorage.getItem('authTokens') ? true : false
  )

  const registerUser = async (e, input) => {
    e.preventDefault()
    try {
      let res = await Client.post(`${BASE_URL}/register/`, input)
      navigate('/login')
      return res.data
    } catch (error) {
      throw error
    }
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
      localStorage.setItem('authTokens', JSON.stringify(data))
      toggleAuthenticated(true)
      navigate('/profile')
      // clear formState
    } else {
      console.log('oops')
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    setUserDetails(null)
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
      body: JSON.stringify({ refresh: authTokens.refresh })
    }
    let res = await fetch(`${BASE_URL}/token/refresh/`, payload)
    let data = await res.json()

    if (res.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
    } else {
      logoutUser()
    }
  }

  useEffect(() => {
    let refreshInterval = setInterval(() => {
      if (authTokens) {
        refreshToken()
      }
    }, 1000 * 60 * 4.95)
    return () => clearInterval(refreshInterval)
  }, [authTokens, loading])

  useEffect(() => {
    const getUserById = async () => {
      if (user) {
        let res = await axios.get(`${BASE_URL}/users/${user.user_id}`)
        setUserDetails(res.data)
      }
    }
    getUserById()
  }, [user])

  const data = {
    user: user,
    userDetails: userDetails,
    isAuthenticated: isAuthenticated,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}
