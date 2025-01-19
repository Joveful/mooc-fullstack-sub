import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}> {text}</button> 
  )
}

const RandomAnecdote = ({votes, anecdotes, idx}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[idx]}<br/>
      has {votes[idx]} votes
    </div>
  )
}

const MostVoted = ({votes, anecdotes}) => {
  let maxIdx = 0
  for (let i = 0; i < votes.length ; i++) {
    if (votes[i] > votes[maxIdx]) {
      maxIdx = i
    }
  }
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[maxIdx]}<br/>
      has {votes[maxIdx]} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [votes , setVotes] = useState(new Uint8Array(anecdotes.length))
  const [selected, setSelected] = useState(0)

  const handleRandomClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <RandomAnecdote votes={votes} anecdotes={anecdotes} idx={selected} />
      <Button handleClick={handleRandomClick} text="Next" />
      <Button handleClick={handleVoteClick} text="Vote" />     
      <MostVoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App