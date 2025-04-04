import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      action.data = ''
  }
}

const App = () => {
  const queryClient = useQueryClient()
  const [message, dispatch] = useReducer(notificationReducer, '')

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = async (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'SET_NOTIFICATION',
      data: `you voted '${anecdote.content}'`,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: '',
      })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const anecdotes = result.data || []


  return (
    <div>
      <h3>Anecdote app</h3>

      <NotificationContext.Provider value={[message, dispatch]}>
        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </NotificationContext.Provider>
    </div>
  )
}

export default App
