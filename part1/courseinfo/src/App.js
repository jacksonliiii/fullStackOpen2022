
const Header = (props) => {

  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Part = (props) => {

  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = () => {

  return (
    <div>
      <Part part={'Fundamentals of React'} exercises={10}/>
      <Part part={'Using props to pass data'} exercises={7}/>
      <Part part={'State of a component'} exercises={14}/>
    </div>
  )
}

const Total = () => {
  return (
    <div>
      Number of exercises {31}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  return (
    <div>
      <Header course={course} />
      <Content  />
      <Total  />
    </div>
  )
}

export default App;
