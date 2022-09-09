import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Nav from './components/Nav/Nav'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'

const user = {
  username: 'austintaylor'
}

const isAuthenticated = true

function App() {
  return (
    <Router>
      <Nav user={user} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home user={user} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/profile"
          element={<Profile user={user} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  )
}

export default App
