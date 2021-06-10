import React, { useState } from 'react'
import './App.css'

const Statistic = (props) => {

  if (props.text === "Positive Feedback") {
    return (
      <tr>
      <td>{props.text}</td>
      <td>{props.value}%</td>
    </tr>   
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>   
  )
}

const Statistics = (props) => {

  if (!props.good && !props.neutral && !props.bad) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
        <div className="stats">
          <table>
            <tbody>
              <Statistic text="Good" value={props.good}/>
              <Statistic text="Neutral" value={props.neutral}/>
              <Statistic text="Bad" value={props.bad}/>
              <Statistic text="Feedback received" value={props.good + props.neutral + props.bad}/>
              <Statistic text="Average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)}/>
              <Statistic text="Positive Feedback" value={props.good * 100 / (props.good + props.neutral + props.bad)}/>
            </tbody>
          </table>
        </div>
  )
}

const Button = (props) => {
  return (<button onClick={props.handleClick}>{props.text}</button>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      {/* BUTTON SECTION*/}
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="Good"/>
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
        <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      </div>
      {/* DISPLAY SECTION*/}
      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App
