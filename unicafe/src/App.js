// Exercises 1.6 to 1.11
import { useState } from 'react'
import Button from './Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h2>Give Feedback</h2>
        <Button text='good' onClick={() => setGood(good + 1)} />
        <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
        <Button text='bad' onClick={() => setBad(bad + 1)} />
        <h2>Statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
    </div>
  )
}

export default App