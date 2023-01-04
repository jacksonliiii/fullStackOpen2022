
const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <h3>Number of exercises {sum}</h3>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
    parts.map(part => 
      <div key={part.id}>
        <Part part={part}/>
      </div>
    )
  )
}

const Course = ({ course }) => {

  const parts = course.parts
  const name = course.name

  return (
    <div>
      <Header name={name}/>
      <Content parts={parts}/>
      <Total sum={parts.reduce((acc, curr) => acc + curr.exercises, 0)}/>
    </div>
  )
}

export default Course