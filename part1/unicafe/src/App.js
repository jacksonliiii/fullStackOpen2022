import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
      
  )
}

const Statistics = ({good, neutral, bad}) => {

  if ((good + neutral + bad) !== 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text='Good' value={good}/>
            <StatisticsLine text='Neutral' value={neutral}/>
            <StatisticsLine text='Bad' value={bad}/>
            <StatisticsLine text='All' value={good + neutral + bad}/>
            <StatisticsLine text='Average' value={(good - bad) / (good + neutral + bad)}/>
            <StatisticsLine text='Positive' value={(good / (good + neutral + bad)) * 100 + '%'}/>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text={'Give Feedback'}/>
      <Button onClick={() => setGood(good + 1)} text={'Good'}/>
      <Button onClick={() => setNeutral(neutral + 1)} text={'Neutral'}/>
      <Button onClick={() => setBad(bad + 1)} text={'Bad'}/>

      <Title text={'Statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
