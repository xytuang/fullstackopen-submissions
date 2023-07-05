import { QueryClient, useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll } from './request'

const App = () => {
  const queryClient = new QueryClient()
  const result = useQuery(
    'notes', getAll
  )

  if (result.isLoading){
    return (
      <div>is loading...</div>
    )
  }

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
