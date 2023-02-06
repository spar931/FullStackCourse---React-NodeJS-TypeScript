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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [typeOfMessage, setTypeOfMessage] = useState('notification')

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(n => n.name === newName)
        personService
        .update(existingPerson.id, userObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
        })   
        setNotificationMessage(`Updated ${userObject.name}'s number`)
        setTimeout(() => {          
          setNotificationMessage(null)        
        }, 5000)
      }
    } else {
      personService
        .create(userObject)
        .then(returnedUser => {
          setPersons(persons.concat(returnedUser))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${userObject.name}`)
          setTimeout(() => {          
            setNotificationMessage(null)        
          }, 5000)
        })
        .catch(error => {
          setTypeOfMessage('error')
          setNotificationMessage(error.response.data.error)
          setTimeout(() => {          
            setNotificationMessage(null)        
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} typeOfMessage={typeOfMessage}/>
      <Filter handleFilterChange={handleFilterChange} />
      <PersonForm 
        addNameAndNumber={addNameAndNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons 
        persons={persons} 
        search={newFilter} 
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
        setTypeOfMessage={setTypeOfMessage}
      />
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


const Persons = ({persons, search, setPersons, setNotificationMessage, setTypeOfMessage}) => {
  const filteredPersons = persons.filter(person => person.name.includes(search))

  const deleteNote = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      setNotificationMessage(`Deleted ${person.name}`)
      personService.deletePerson(person.id)
      .catch(error => {
        setTypeOfMessage('error')
        setNotificationMessage(
          `${person.name} was already deleted from the server`
        )
      })
      setPersons(persons.filter(p => p.id !== person.id))
      setTimeout(() => {          
        setNotificationMessage(null)        
        setTypeOfMessage('notification')
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Numbers</h2>
        {filteredPersons.map(person => 
          <li key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => deleteNote(person)}>delete</button>
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


const Notification = ({ message, typeOfMessage}) => {
  if (message === null) {
    return null
  }

  if (typeOfMessage === 'error') {
    return (
      <div id='error' className='notification'>
        {message}
      </div>
    )
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

export default App