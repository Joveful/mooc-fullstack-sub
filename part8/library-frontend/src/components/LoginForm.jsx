import { useMutation } from "@apollo/client"
import { useState } from "react"
import { LOGIN, GET_USER } from "../queries"

const LoginForm = ({ setToken, show, setPage, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    refetchQueries: [GET_USER]
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const res = await login({ variables: { username, password } })
    console.log(res.data.login.value)
    localStorage.setItem('library-user-token', res.data.login.value)
    setToken(res.data.login.value)

    setUsername('')
    setPassword('')
    setPage("authors")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm
