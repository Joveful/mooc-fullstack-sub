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
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
