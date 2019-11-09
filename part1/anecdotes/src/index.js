import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ text }) => <div>{text}</div>

const MostVoted = ({ votes, anecdotes }) => {
  const maxVotes = Math.max(...votes)
  const index = votes.findIndex(votes => votes === maxVotes)

  return (
    <>
      <h1>Most voted anecdote</h1>
      <div>{anecdotes[index]}</div>
      <div>Which has {maxVotes} votes</div>
    </>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  return (
    <>
      <h1>A random anecdote</h1>
      <Anecdote text={anecdotes[selected]} />
      <div>Has {votes[selected]} votes</div>
      <button
        onClick={() => {
          const newVotes = [...votes]
          newVotes[selected] += 1
          setVotes(newVotes)
        }}
      >
        Vote!
      </button>
      <button
        onClick={() => {
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }}
      >
        Next anecdote
      </button>
      <MostVoted votes={votes} anecdotes={anecdotes} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
