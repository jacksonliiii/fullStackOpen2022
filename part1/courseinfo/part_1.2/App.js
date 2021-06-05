import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} number={props.number1}/>
      <Part name={props.name2} number={props.number2}/>
      <Part name={props.name3} number={props.number3}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.number}</p>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>{props.first + props.second + props.third}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content name1={part1} name2={part2} name3={part3} number1={exercises1} number2={exercises2} number3={exercises3}/>
      <Total first={exercises1} second={exercises2} third={exercises3}/>
    </div>
  )
}

export default App
