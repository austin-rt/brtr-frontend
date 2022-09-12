import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { UserProvider } from './context/UserContext'
import Nav from './components/Nav/Nav'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import ProductDetails from './pages/PoductDetails/ProductDetails'

const BASE_URL = process.env.REACT_APP_BASE_URL

function App() {
  let navigate = useNavigate()

  const initialFormState = {
    username: '',
    password: ''
  }

  const [formState, setFormState] = useState(initialFormState)
  const [productsFeed, setProductsFeed] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormState({ ...formState, [id]: value })
  }

  const getProducts = async () => {
    const res = await axios.get(`${BASE_URL}/products/`)
    const allProducts = res.data
    setProductsFeed(allProducts)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const chooseProduct = (selected) => {
    setSelectedProduct(selected)
    navigate(`/products/${selected.id}`)
  }

  return (
    <UserProvider>
      <Nav />
      <Routes>
        <Route
          path="/"
          exact
          index
          element={
            <Home productsFeed={productsFeed} chooseProduct={chooseProduct} />
          }
        />
        <Route
          path="/login"
          element={<Login handleChange={handleChange} formState={formState} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/register"
          element={
            <Register handleChange={handleChange} formState={formState} />
          }
        />
        <Route
          path="/products/:productId"
          element={<ProductDetails selectedProduct={selectedProduct} />}
        />
        {/* <Route path="/user/:userId" element={<UserDetail />} /> */}
      </Routes>
    </UserProvider>
  )
}

export default App
