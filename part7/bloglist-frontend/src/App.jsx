import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, setLoggedInUser } from './reducers/userReducer'
import User from './components/User'
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

  return (
    <div>
      <h1>blogs</h1>
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Router>
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
