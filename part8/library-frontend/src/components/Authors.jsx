import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";


const Authors = (props) => {
  const [name, setName] = useState(null)
  const [newDob, setNewDob] = useState('')

  const [changeDob] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const updateBirthYear = (event) => {
    event.preventDefault()

    const numDob = Number(newDob)
    console.log(name)
    changeDob({ variables: { name: name.value, setBornTo: numDob } })

    setName(null)
    setNewDob('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set year of birth</h2>
      <form onSubmit={updateBirthYear}>
        <div>
          name
          <Select
            options={options}
            value={name}
            onChange={(e) => setName(e)}
          />
        </div>
        <div>
          born
          <input
            value={newDob}
            onChange={(e) => setNewDob(e.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
