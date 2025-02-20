import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    }
    createBlog(blogObject)

    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newBlog}
            onChange={event => setNewBlog(event.target.value)}
            id='blog-title'
            data-testid='title'
          />
        </div>
        <div>
          author:
          <input
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
            id='blog-author'
            data-testid='author'
          />
        </div>
        <div>
          url:
          <input
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
            id='blog-url'
            data-testid='url'
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
