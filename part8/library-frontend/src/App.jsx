import { useEffect, useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import { ALL_BOOKS, BOOK_ADDED, GET_USER } from "./queries";
import Recommended from "./components/Recommended";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [token])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(addedBook)
      alert(`A new book was added: ${addedBook.title}`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const userQuery = useQuery(GET_USER)
  if (userQuery.loading) {
    return (
      <div>loading...</div>
    )
  }
  const user = userQuery.data.me

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <Recommended user={user} show={page === "recommended"} />
      <NewBook show={page === "add"} setError={setErrorMessage} />
      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} setError={setErrorMessage} />
    </div>
  );
};

export default App;
