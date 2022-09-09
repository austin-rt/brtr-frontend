import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

import axios from 'axios'

import { UserProvider } from './context/UserContext'
import Nav from './components/Nav/Nav'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'

const BASE_URL = process.env.REACT_APP_BASE_URL

function App() {
  // let navigate = useNavigate()

  const initialFormState = {
    username: '',
    password: ''
  }

  const [formState, setFormState] = useState(initialFormState)
  const [productsFeed, setProductsFeed] = useState([])

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

  return (
    <Router>
      <UserProvider>
        <Nav />
        <Routes>
          <Route
            path="/"
            exact
            element={<Home productsFeed={productsFeed} />}
          />
          <Route
            path="/login"
            element={
              <Login handleChange={handleChange} formState={formState} />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
