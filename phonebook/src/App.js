// Exercises 2.6 to 2.11
// Exercises 2.15 to 2.18
import { useState, useEffect } from 'react'
import personService from './services'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {    
    personService      
      .getAll()      
      .then(initialPersons => {        
        console.log('promise fulfilled')        
        setPersons(initialPersons)      
      })  
    }, [])  
    console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      personService
        .create(userObject)
        .then(returnedUser => {
          setPersons(persons.concat(returnedUser))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} />
      <PersonForm 
        addNameAndNumber={addNameAndNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons persons={persons} search={newFilter} />
    </div>
  )
}


const Filter = ({handleFilterChange}) => {
  return (
    <div>
      filter shown with <input onChange={handleFilterChange}/>
    </div>
  )
}


const Persons = ({persons, search}) => {
  const filteredPersons = persons.filter(person => person.name.includes(search))
  return (
    <div>
      <h2>Numbers</h2>
        {filteredPersons.map(person => 
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        )}
    </div>
  )
}


const PersonForm = ({addNameAndNumber, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (
    <div>
      <h2>Add a new contact</h2>  
        <form onSubmit={addNameAndNumber}>
          <div>name: <input value={newName} onChange={handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <div><button type="submit">add</button></div>
        </form>
    </div>
  )
}

export default App