import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value

    try {
      dispatch(loginUser({ username, password }))
    } catch (exception) {
      dispatch(setNotification('Incorrect username or password', false, 5))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" name="Username" />
      </div>
      <div>
        password
        <input type="password" name="Password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
