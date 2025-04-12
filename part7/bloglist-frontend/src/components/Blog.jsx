import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemove = {
    display: blog.user.username === user.username ? '' : 'none',
  }

  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (blog) => {
    dispatch(voteBlog(blog))
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <li className="blogstyle">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={() => like(blog)}>like</button>
        <br />
        {blog.user.name}
        <div style={showRemove}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </li>
  )
}

export default Blog
