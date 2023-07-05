import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    increaseVote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    },
    addAnecdote(state, action){
      const anecdote = action.payload
      state.push(asObject(anecdote))
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }

})

export const { increaseVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer