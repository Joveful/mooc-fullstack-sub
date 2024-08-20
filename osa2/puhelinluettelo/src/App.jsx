import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons } from './components/Person'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')

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
        })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    // check if name is already in array
    const duplicate = persons.find(
      (person) => person.name === newName
    )
    console.log(duplicate)
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
    }
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