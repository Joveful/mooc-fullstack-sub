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
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg text-gray-900">
      <h2 className="text-3xl font-bold mb-2">
        {blog.title} <span className="text-xl font-medium text-gray-600">by {blog.author}</span>
      </h2>
      <a
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-all block mb-4"
      >
        {blog.url}
      </a>
      <div className="flex items-center space-x-4 mb-2">
        <span className="text-lg">likes <span className="font-semibold">{blog.likes}</span></span>
        <button
          onClick={() => like(blog)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
        >
          like
        </button>
      </div>
      <div className="mb-4 text-gray-700 italic">added by {blog.user.name}</div>
      <div style={showRemove} className="mb-6">
        <button
          onClick={deleteBlog}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
        >
          remove
        </button>
      </div>
      <h3 className="text-2xl font-semibold mb-3">Comments</h3>
      <form onSubmit={handleComment} className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          value={com}
          onChange={(event) => setCom(event.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a comment"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          add comment
        </button>
      </form>
      <ul className="space-y-2">
        {blog.comments.toReversed().map((c, idx) => (
          <li
            key={idx}
            className="bg-gray-100 rounded px-3 py-2 text-gray-800"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
