
import { useState, useEffect } from 'react'
import phonebookService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import './App.css'

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }

  if (success) {
    return (
      <div className='successful'>
        {message}
      </div>
    )
  }
  
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    phonebookService
    .getPersons()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const createPersonObject = () => {
    return {
      name: newName,
      number: newNumber,
    }
  }

  const addName = (event) => {
    event.preventDefault()

    if ( newName === '' || newNumber === '') {
      setMessage("Make sure to fill out form before clicking 'Add'!")
      setSuccess(false)
      setTimeout(() => {setMessage(null)}, 5000)
      return
    }

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {

        phonebookService
        .updatePerson(existingPerson.id, newNumber)
        .then(returnedPerson => {
          setPersons(persons)
          setNewName('')
          setNewNumber('')
          window.location.reload()
        })
        .catch(error => {
          setMessage(`Information of ${newName} has already been removed from server`)
          setSuccess(false)
          setTimeout(() => {setMessage(null)}, 5000)
        })
      }
    } else {
      const personObject = createPersonObject()

      phonebookService
      .createPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${returnedPerson.name}`)
        setSuccess(true)
        setTimeout(() => {setMessage(null)}, 5000)
      })
    }
  }

  const deleteName = (objectID) => {
    phonebookService
    .deletePerson(objectID)
    .then(returned => {
      console.log(returned)})
    .catch(e => {
      console.log(e)
    })

    if (window.confirm(`Do you want to delete person ${objectID}?`)) {
      setPersons(persons.filter(p => p.id !== objectID))
    }
  }

  return (
    <div className='main-container'>
      <h1>Phonebook</h1> 
      <Notification message={message} success={success}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>Add a New Entry</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} filter={filter} deleteName={deleteName}/>
      </div>
    </div>
  )
}

export default App