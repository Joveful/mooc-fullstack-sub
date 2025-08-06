import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommended = ({ show, user }) => {
  console.log(user)
  const favoriteGenre = user ? user.favoriteGenre : null
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre }
  })

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>Recommended books</h2>
      Recommended genre is <b>{favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Recommended
