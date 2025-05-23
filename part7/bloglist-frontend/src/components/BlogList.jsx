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
    <div>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      {blogs.map((blog) => (
        <div key={blog.id} className="blogstyle">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
