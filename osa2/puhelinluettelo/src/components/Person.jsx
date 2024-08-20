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
  
const Persons = ({persons, deletePersonById}) => {
  return (
    persons.map((person) =>
      <div key={person.id}>
        {person.name} {person.number} 
        <button 
          type="submit" 
          onClick={() => deletePersonById(person)}>
            delete
        </button>
      </div>
    )
  )
}

export { Filter, PersonForm, Persons }