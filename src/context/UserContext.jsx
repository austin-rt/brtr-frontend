import { createContext, useState, useEffect } from 'react'

import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL

const UserContext = createContext()

export default UserContext

export const UserProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null)
  const [user, setUser] = useState(null)

  const getCookie = () => {
    let cookieValue = null
    if (document.cookie) {
      let cookies = document.cookie.split(';')
      cookieValue = cookies[0].toString()
      cookieValue = cookieValue.substring(10, cookieValue.length)
    }
    return cookieValue
  }

  const checkSession = async (token) => {
    let csrfToken = decodeURIComponent(document.cookie)
    let tokenObj = {
      token: token.access,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie(csrfToken),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
    let userSession = await checkToken(tokenObj)
    if (!userSession) {
      tokenObj = {
        ...tokenObj,
        token: token.refresh
      }
      userSession = await refreshToken(tokenObj)
    }
    setUser(userSession)
    setIsLoggedIn(true)
  }

  useEffect(() => {
    const checkTokenStatus = async () => {
      let token = {
        access: localStorage.getItem('token_access'),
        refresh: localStorage.getItem('token_refresh')
      }
      if (token) {
        checkSession(token)
      }
    }
    checkTokenStatus()
  }, [setIsLoggedIn])

  const loginUser = async (e, input) => {
    e.preventDefault()
    let payload = {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': getCookie(csrfToken),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: { ...input }
    }

    let res = await axios.post(`${BASE_URL}/token`, payload)
    console.log(res)
  }

  const data = {
    loginUser: loginUser
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}
