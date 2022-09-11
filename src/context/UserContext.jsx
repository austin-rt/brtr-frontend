import { createContext, useState, useEffect } from 'react'
import { SignInUser, RegisterUser, CheckSession } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const UserContext = createContext()

export default UserContext

const BASE_URL = process.env.REACT_APP_BASE_URL

export const UserProvider = ({ children }) => {
  let navigate = useNavigate()
  const [authTokens, setAuthTokens] = useState(null)
  const [user, setUser] = useState(null)

  const registerUser = async (e, input) => {
    e.preventDefault()
    RegisterUser(input)
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
    console.log('data:', data)
    console.log('res:', res)
    if (res.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      console.log(user.username)
    } else {
      console.log('oops')
    }
  }

  const data = {
    registerUser: registerUser,
    loginUser: loginUser
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}
