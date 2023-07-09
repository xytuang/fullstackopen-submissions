import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={logout}>logout</button>}
        {token && <button onClick={() => setPage('recommend')}>recommended</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      {token && <NewBook show={page === 'add'} />}

      <LoginForm show={page === 'login'} setToken={setToken}/>
      <Recommend show={page === 'recommend'}/>
    </div>
  )
}

export default App
