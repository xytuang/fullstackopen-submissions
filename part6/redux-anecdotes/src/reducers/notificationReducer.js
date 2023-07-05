import { createSlice } from "@reduxjs/toolkit"

const initialState = 'this is the initial message'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationChange(state, action){
            const notification = action.payload
            return notification
        }
    }
})

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer