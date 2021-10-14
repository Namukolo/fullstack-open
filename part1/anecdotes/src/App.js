import React, { useState } from 'react'


const Button = ({ onClick, btnText }) => {
  return (
    <>
      <button onClick={onClick}>{btnText}</button>
    </>
  )
}

const DisplayVotes = ({ votes }) => {
  return (
    <>
      <p>has {votes} votes</p>
    </>
  )
}

const HighestAnecdote = ({ anecdotes, votes }) => {
  const highestVotes = Math.max(...votes)
  const winnerIndex = votes.indexOf(highestVotes)
  const winner = anecdotes[winnerIndex]
  if (highestVotes === 0) {
    return (
      <p>No votes yet</p>
    )
  }

  return (
    <div>
      <p>{winner}</p>
      <p>has {highestVotes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',

    'Adding manpower to a late software project makes it later!',

    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',

    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',

    'Premature optimization is the root of all evil.',

    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',

    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'

  ]

  const generateRandom = () => {
    const randomNumber = Math.floor(Math.random() * (anecdotes.length - 0) + 0)
    setSelected(randomNumber);
  }

  const Header = ({ text }) => {
    return (
      <>
        <h2>{text}</h2>
      </>
    )
  }



  const vote = () => {
    const newAllVotes = [...votes]
    newAllVotes[selected] += 1
    setVotes(newAllVotes)
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  return (
    <>
      <Header text='Anecdote of the day'></Header>
      {anecdotes[selected]}
      <DisplayVotes votes={votes[selected]}></DisplayVotes>
      <br />
      <Button onClick={vote} btnText='vote'></Button>
      <Button onClick={generateRandom} btnText='next anecdote'></Button>
      <Header text='Anecdote with most votes'></Header>
      <HighestAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App