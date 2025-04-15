import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { voteBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blog)
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  const showRemove = {
    display: blog.user.username === user.username ? '' : 'none',
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
    <div>
      <h2>{blog.title} {blog.author}</h2>
      {blog.url}
      <br />
      likes {blog.likes} <button onClick={() => like(blog)}>like</button>
      <br />
      {blog.user.name}
      <div style={showRemove}>
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
