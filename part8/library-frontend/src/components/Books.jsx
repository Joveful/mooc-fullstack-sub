import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";


const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  })
  const allGenres = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading || allGenres.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const genres = allGenres.data.allBooks.map(b => [b.genres]).flat(2)
  const genresDistinct = [...new Set(genres)]

  return (
    <div>
      <h2>books</h2>

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
      {genresDistinct.map(g => (
        <>
          <button
            onClick={() => result.refetch({ genre: g })}
          >{g}</button>
        </>
      ))}
      <>
        <button onClick={() => result.refetch({ genre: null })}>all genres</button>
      </>
    </div>
  )
}

export default Books
