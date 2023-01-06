// Exercises 1.6 to 1.11
import { useState } from 'react'
import Button from './Button'

const Statistics = ({text, statistic}) => {
    return (
        <div>
            <p>{text} {statistic}</p>
        </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
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
        <Statistics text='good' statistic={good}/>
        <Statistics text='neutral' statistic={neutral}/>
        <Statistics text='bad' statistic={bad}/>
        <Statistics text='all' statistic={good + neutral + bad}/>
        <Statistics text='average' statistic={((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)}/>
        <Statistics text='positive' statistic={(good / (neutral + bad + good)) * 100}/>
    </div>
  )
}

export default App