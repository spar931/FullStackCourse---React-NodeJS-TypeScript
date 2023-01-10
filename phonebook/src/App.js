// Exercises 2.6 to 2.10
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'arto hellas' , number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value.toLowerCase())
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      <h2>Phonebook</h2>
      <form onSubmit={addNameAndNumber}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        )}
    </div>
  )
}

export default App