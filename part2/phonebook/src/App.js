import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotification, setNotification] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    }
    for (let i = 0; i < persons.length; ++i){
      if (persons[i].name == newName){
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
          personService
          .update(persons[i].id, person)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== persons[i].id ? person : returnedPerson))
          })
          setNotification(`${newName} has been updated!`)
          setTimeout(() => {
            setNotification('')
          }, 5000)
        }
        setNewName('')
        setNewNumber('')
        return
      }
    }
    personService
    .create(person)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })
    setNotification(`Added ${newName}!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    setNewName('')
    setNewNumber('')
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const toFind = event.target.value;
    setNewFilter(toFind);
  }

  const deletePerson = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personID = filteredPerson[0].id
    if (window.confirm(`Delete ${personName}?`)){
      personService
      .destroy(personID)
      .catch(error => {
        setNotification(`${personName} has already been deleted from the server`)
      })
      setTimeout(() => {
        setNotification('')
      }, 5000)
      setPersons(persons.filter(person => person.id !== personID))
    }
  }

  return (
    <div>
      <Notification notification={newNotification}/>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
