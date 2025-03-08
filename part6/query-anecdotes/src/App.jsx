import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
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

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>

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
    </div>
  )
}

export default App
