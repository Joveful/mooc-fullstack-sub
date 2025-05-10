import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { voteBlog, removeBlog, addComment } from '../reducers/blogReducer'

const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blog)
  const blog = blogs.find((b) => b.id === id)
  const [com, setCom] = useState('')

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

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(com, blog.id))
    setCom('')
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      {blog.url}
      <br />
      likes {blog.likes} <button onClick={() => like(blog)}>like</button>
      <br />
      {blog.user.name}
      <div style={showRemove}>
        <button onClick={deleteBlog}>remove</button>
      </div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <input type="text" value={com} onChange={(event) => setCom(event.target.value)} />
          <button >add comment</button>
        </div>
      </form >
      <ul>
        {blog.comments.toReversed().map(c =>
          <li key={Math.floor(Math.random() * 10000)}>{c}</li>)}
      </ul>
    </div >
  )
}

export default Blog
