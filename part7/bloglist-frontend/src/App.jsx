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
    padding: 5
  }

  const navbar = {
    backgroundColor: 'lightgrey'
  }

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Router>
            <div style={navbar}>
              <Link style={padding} to="/">blogs</Link>
              <Link style={padding} to="/users">users</Link>
              <em>{user.name} logged in</em>
              <button onClick={handleLogout}>logout</button>
            </div>
            <Notification />
            <h1>blog app</h1>
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog user={user} />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
