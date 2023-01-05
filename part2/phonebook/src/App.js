import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <form>
      <div>Filter shown with <input value={filter} onChange={handleFilterChange}/></div>
    </form>
  )
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({persons, filter}) => {
  return (
    <div>
      {persons.filter(person => person.name.includes(filter)).map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName) ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: newName.name
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return(
    <div>
      <h2>Phonebook</h2> 
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>Add a New Entry</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App