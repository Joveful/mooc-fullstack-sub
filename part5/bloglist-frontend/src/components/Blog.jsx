import { useState } from 'react'

const Blog = ({ blog, updateLikes, user, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemove = { display: blog.user.username === user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateBlogLikes = (event) => {
    event.preventDefault()
    const blogObject = {
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateLikes(blog.id, blogObject)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleRemove(blog.id)
    }
  }

  return (
    <div className='blogstyle'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} >
        {blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={updateBlogLikes}>like</button>
        <br />
        {blog.user.name}
        <div style={showRemove}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
