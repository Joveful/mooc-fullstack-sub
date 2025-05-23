import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const [message, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({
        type: 'SET_NOTIFICATION',
        data: `you created '${variables.content}'`,
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION',
        })
      }, 5000)
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: error.response.data.error,
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION',
        })
      }, 5000)
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
