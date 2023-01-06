// Exercises 1.6 to 1.11
import { useState } from 'react'
import Button from './Button'

const StatisticLine = ({text, stat, sign}) => {
    return (
            <tr>
                <td>{text}</td>
                <td>{stat}{sign}</td>
            </tr>
    )
}

const Statistics = ({stat1, stat2, stat3}) => {
    if ((stat1 + stat2 + stat3) > 0) {
        return (
            <div>
                <table>
                    <tbody>
                        <StatisticLine text='good' stat={stat1} />
                        <StatisticLine text='neutral' stat={stat2} />
                        <StatisticLine text='bad' stat={stat3} />
                        <StatisticLine text='all' stat={stat1 + stat2 + stat3} />
                        <StatisticLine text='average' stat={((stat1 * 1) + (stat2 * 0) + (stat3 * -1)) / (stat1 + stat2 + stat3)} />
                        <StatisticLine text='positive' stat={(stat1 / (stat2 + stat3 + stat1)) * 100} sign='%' />
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div><p>No Feedback Given</p></div>
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
        <Statistics stat1={good} stat2={neutral} stat3={bad}/>
    </div>
  )
}

export default App