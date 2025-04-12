import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer.js'
import { initializeBlogs, addBlog } from './reducers/blogReducer.js'
import { logoutUser, setLoggedInUser } from './reducers/userReducer.js'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm.jsx'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable.jsx'
import LoginForm from './components/LoginForm.jsx'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blog)

  const blogFormRef = useRef()

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

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(addBlog({ ...blogObject, user: user }))
      dispatch(
        setNotification(
          `Added blog: ${blogObject['title']} by ${blogObject['author']}`,
          true,
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification('Failed to add blog', false, 5))
    }
  }

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
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Toggleable>
          <ul>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
