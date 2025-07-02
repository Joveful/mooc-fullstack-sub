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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Blog</h2>
      <form onSubmit={addBlog} className="space-y-4">
        <div>
          <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            value={newBlog}
            onChange={(event) => setNewBlog(event.target.value)}
            id="blog-title"
            data-testid="title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter blog title"
          />
        </div>
        <div>
          <label htmlFor="blog-author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            id="blog-author"
            data-testid="author"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter author name"
          />
        </div>
        <div>
          <label htmlFor="blog-url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            id="blog-url"
            data-testid="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter blog URL"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default BlogForm
