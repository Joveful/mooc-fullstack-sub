import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, handle}) => {
  return (
    <div>
      filter: <input
        value={filter}
        onChange={handle}
      />
    </div>
  )
}

const PersonForm = ({addName, newName, handleName, newNum, handleNum}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input 
          value={newName}
          onChange={handleName}
        />
      </div>
      <div>
        number: <input
          value={newNum}
          onChange={handleNum}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons}) => {
  return (
    persons.map((person) =>
      <div key={person.name}>
        {person.name} {person.number}
      </div>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
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

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
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
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App