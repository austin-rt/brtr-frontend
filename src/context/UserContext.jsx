import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import axios from 'axios'

const UserContext = createContext()

export default UserContext

const BASE_URL = process.env.REACT_APP_BASE_URL

export const UserProvider = ({ children }) => {
  const navigate = useNavigate()

  const RegisterUser = async (data) => {
    try {
      const res = await Client.post('/users/register', data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const LoginUser = async (data) => {
    try {
      const res = await Client.post(`${BASE_URL}/users/login`, data)
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      toggleAuthenticated(true)
    } catch (error) {
      throw error;
    }
  };

  const CheckSession = async () => {
    try {
      const res = await Client.get('/users/session');
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const [userDetails, setUserDetails] = useState(null)
  const [token, settoken] = useState(null)
  const [user, setUser] = useState(null)
  const [isAuthenticated, toggleAuthenticated] = useState(null)

  const logoutUser = () => {
    settoken(null)
    setUser(null)
    setUserDetails(null)
    localStorage.removeItem('token')
    toggleAuthenticated(false)
    navigate('/login')
  }

  const getUserById = async () => {
    if (user) {
      let res = await axios.get(`${BASE_URL}/users/${user.id}`)
      setUserDetails(res.data)
    }
  }
  useEffect(() => {
    getUserById()
  }, [user])

    const [productsFeed, setProductsFeed] = useState([])
  const getProducts = async () => {
    const res = await axios.get(`${BASE_URL}/products/`)
    const allProducts = res.data
    setProductsFeed(allProducts)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const data = {
    user: user,
    userDetails: userDetails,
    isAuthenticated: isAuthenticated,
    productsFeed: productsFeed,
    setUser: setUser,
    RegisterUser: RegisterUser,
    LoginUser: LoginUser,
    logoutUser: logoutUser,
    getProducts: getProducts,
    getUserById: getUserById
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}
