import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

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
      const id = action.payload.id
      console.log('from increaseVote', action.payload)
      return state.map(a => a.id !== id ? a : action.payload)
    },
    addAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }

})

export const { increaseVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const voting = object => {
  const newObject = {...object, votes: object.votes + 1}
  console.log('from voting', newObject)
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(newObject)
    console.log('this is newAnecdote', newAnecdote)
    dispatch(increaseVote(newAnecdote))
  }
}

export default anecdoteSlice.reducer