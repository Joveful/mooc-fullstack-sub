import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, setLoggedInUser } from './reducers/userReducer'
import User from './components/User'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedInUser.token)
      dispatch(setLoggedInUser(loggedInUser))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(logoutUser())
    blogService.setToken(null)
  }

  const padding = {
    padding: 5,
  }

  const navbar = {
    backgroundColor: 'lightgrey',
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Router>
            <nav className="bg-gray-900 shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      blogs
                    </Link>
                    <Link to="/users" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      users
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-300 italic">{user.name} logged in</span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      logout
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Notification />
              <h1 className="text-4xl font-bold text-center mb-8">blog app</h1>
              <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<Blog user={user} />} />
              </Routes>
            </main>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
