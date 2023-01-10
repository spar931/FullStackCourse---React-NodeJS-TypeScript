// Exercises 2.6 to 2.10
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'arto hellas', number: '040-123456', id: 1 },
    { name: 'ada lovelace', number: '39-44-5323523', id: 2 },
    { name: 'dan abramov', number: '12-43-234345', id: 3 },
    { name: 'mary poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const filteredPersons = persons.filter(person => person.name.includes(newFilter))

  const handleNameChange = (event) => {
    setNewName(event.target.value.toLowerCase())
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const userObject = {
      name : newName,
      number : newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(userObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter shown with <input onChange={handleFilterChange}/></div>
      <h2>Add a new contact</h2>
      <form onSubmit={addNameAndNumber}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
          {filteredPersons.map(person => 
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        )}
    </div>
  )
}

export default App