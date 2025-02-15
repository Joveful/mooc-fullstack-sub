import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm.jsx'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable.jsx'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      returnedBlog.user = user
      setBlogs(blogs.concat(returnedBlog))
      setMessageType('success')
      setMessage(`Added blog: ${blogObject['title']} by ${blogObject['author']}`)
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    } catch (exception) {
      setMessage('Failed to add blog')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const updateLikes = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      returnedBlog.user = blogs.find(blog => blog.id === id).user
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (exception) {
      setMessage('Failed to update likes')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (exception) {
      setMessage('Failed to delete blog')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} type={messageType} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Toggleable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} updateLikes={updateLikes} handleRemove={deleteBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
