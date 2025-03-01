import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons } from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')
  const [messageType, setMessageType] = useState("success")
  const [alertMessage, setAlertMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Handle existing person's number change
  // called from addName
  const changeNumber = (id) => {
    if(window.confirm(`${newName} is already in the phonebook. Do you want to replace the number?`)) {
      const person = persons.find(p => p.id === id)
      const changedPerson = { ...person, number: newNumber }
      
      personService
        .updateNumber(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          handleMessage(`Changed number for ${person.name}`, 'success')
        })
        .catch(error => {
          handleMessage(error.response.data.error, 'error')
        })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    // check if name is already in array
    const duplicate = persons.find(
      (person) => person.name === newName
    )

    if (!duplicate) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      
      personService
        .createPerson(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          handleMessage(`Added ${newName}`, 'success')
        })
        .catch(error => {
          console.log(error.response.data)
          handleMessage(error.response.data.error, 'error')
        })
    }
    else {
      changeNumber(duplicate.id)
    }
  }

  const deletePersonById = person => {
    if(window.confirm(`Delete ${person.name}`)) {
      personService
        .deletePerson(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(person =>
            person.id !== returnedPerson.id
          ))
        })
        .catch(error => {
          handleMessage(`Person ${person.name} was already removed`, 'error')
        })
      
      // Successful deletion
      handleMessage(`Deleted ${person.name}`, 'success')
    }
  }

  const handleMessage = (message, type) => {
    setMessageType(type)
    setAlertMessage(message)
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterPersonsChange = (event) => {
    setFilterPersons(event.target.value)
  }

  const personsToShow = persons.filter(
    (person) => person.name.toLowerCase().includes(filterPersons.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage}  type={messageType} />
      <Filter filter={filterPersons} handle={handleFilterPersonsChange} />
      <h3>Add new entry</h3>
      <PersonForm addName={addName}
        newName={newName} handleName={handleNameChange}
        newNum={newNumber} handleNum={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={personsToShow} 
        deletePersonById={deletePersonById}
      />
    </div>
  )
}

export default App