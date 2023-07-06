import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', timeout: null }
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      if (state.timeout){
        clearTimeout(state.timeout)
      }
      return action.payload
    }
  }
})

export const notificationChange = (message, secondsToShow) => {
  return async dispatch => {
    const timeout = setTimeout(() => {
      dispatch(notificationSlice.actions.notificationChange(initialState))
    }, 1000 * secondsToShow)
    dispatch(notificationSlice.actions.notificationChange({message, timeout}))
  }
}

export default notificationSlice.reducer