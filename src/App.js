import { useState, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import axios from 'axios'

import Nav from './components/Nav/Nav'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import ProductDetails from './pages/PoductDetails/ProductDetails'
import UserListings from './components/UserListings/UserListings'
import UserContext from './context/UserContext'
import Client from './services/api'

const BASE_URL = process.env.REACT_APP_BASE_URL

function App() {
  let navigate = useNavigate()

  let { productsFeed, getProducts, getUserById } = useContext(UserContext)

  const initialFormState = {
    username: '',
    password: '',
    email: ''
  }
  const initialProductFormState = {
    seller_id: '',
    name: '',
    price: '',
    image: '',
    description: ''
  }

  const [formState, setFormState] = useState(initialFormState)

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalVisibility, toggleModalVisibility] = useState(false)
  const [productFormState, setProductFormState] = useState(
    initialProductFormState
  )
  const [editing, setEditing] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormState({ ...formState, [id]: value })
  }

  const chooseProduct = (selected) => {
    setSelectedProduct(selected)
    navigate(`/products/${selected?.id}`)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const addToCart = (id) => {
    console.log(`clicked product no ${id}`)
  }

  const leaveReview = (id) => {
    console.log(`leave review for product no ${id}`)
  }

  const editListing = (prodId) => {
    setEditing(true)
    productsFeed.forEach((product) => {
      if (product.id === prodId)
        setProductFormState({
          id: product.id,
          seller_id: product.seller_id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description
        })
    })
    toggleModalVisibility(true)
  }

  const putProduct = async (e, data) => {
    e.preventDefault()
    try {
      const res = await Client.put(`products/${data.id}`, data)
    } catch (error) {
      throw error
    }
    try {
      getProducts()
      getUserById()
      navigate('/profile')
    } catch (error) {
      throw error
    }
    toggleModalVisibility(false)
    setProductFormState(initialProductFormState)
  }

  const deleteListing = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/products/${id}`)
      getProducts()
      getUserById()
      navigate('/profile')
      return res.data
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          exact
          index
          element={
            <Home
              modalVisibility={modalVisibility}
              toggleModalVisibility={toggleModalVisibility}
              productsFeed={productsFeed}
              chooseProduct={chooseProduct}
              addToCart={addToCart}
              editListing={editListing}
              leaveReview={leaveReview}
              deleteListing={deleteListing}
              productFormState={productFormState}
              setProductFormState={setProductFormState}
              editing={editing}
              putProduct={putProduct}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              handleChange={handleChange}
              formState={formState}
              setFormState={setFormState}
              initialFormState={initialFormState}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              productFormState={productFormState}
              setProductFormState={setProductFormState}
              modalVisibility={modalVisibility}
              toggleModalVisibility={toggleModalVisibility}
              chooseProduct={chooseProduct}
              addToCart={addToCart}
              editListing={editListing}
              leaveReview={leaveReview}
              deleteListing={deleteListing}
              editing={editing}
              putProduct={putProduct}
            />
          }
        />
        <Route path="/profile/listings" element={<UserListings />} />
        <Route
          path="/register"
          element={
            <Register
              handleChange={handleChange}
              formState={formState}
              setFormState={setFormState}
              initialFormState={initialFormState}
            />
          }
        />
        <Route
          path="/products/:productId"
          element={
            <ProductDetails
              modalVisibility={modalVisibility}
              toggleModalVisibility={toggleModalVisibility}
              selectedProduct={selectedProduct}
              addToCart={addToCart}
              editListing={editListing}
              leaveReview={leaveReview}
              deleteListing={deleteListing}
              productFormState={productFormState}
              setProductFormState={setProductFormState}
              editing={editing}
              putProduct={putProduct}
            />
          }
        />
        {/* <Route path="/user/:userId" element={<UserDetail />} /> */}
      </Routes>
    </>
  )
}

export default App
