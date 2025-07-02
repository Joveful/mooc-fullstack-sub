import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blog)

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

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-50 rounded-lg shadow">
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      <div className="mt-8 space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="blogstyle bg-white rounded-md shadow hover:shadow-lg transition-shadow px-4 py-3"
          >
            <Link
              to={`/blogs/${blog.id}`}
              className="text-lg font-semibold text-blue-700 hover:underline"
            >
              {blog.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
