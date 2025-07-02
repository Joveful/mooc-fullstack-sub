import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const User = () => {
  const [users, setUsers] = useState([])
  const id = useParams().id

  useEffect(() => {
    userService.getAll().then((user) => {
      setUsers(user)
    })
  }, [])

  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{user.name}</h2>
      <h3 className="text-xl font-semibold text-gray-600 mb-3">added blogs</h3>
      <ul className="space-y-2">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
