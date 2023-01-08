//Exercises 1.12 to 1.14
import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)     
  const [allVotes, setAll] = useState(new Array(7).fill(0))
  const copy = [ ...allVotes ]

  const incrementByOne = () => {    copy[selected] += 1;    setAll(copy)  }

  const max_val = Math.max(...allVotes);
  const max_index = allVotes.indexOf(max_val);

  return (
    <div>
      <h1>Ancedote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {allVotes[selected]} votes</p>
      <Button text='vote' onClick={incrementByOne} />
      <Button text='next ancedote' onClick={() => setSelected(Math.floor(Math.random() * 7))} />
      <h1>Ancedote with most votes</h1>
      <p>{anecdotes[max_index]}</p>
    </div>
  )
}

export default App