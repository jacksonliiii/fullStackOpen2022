import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        voteNotify(state, action) {
            return `You voted for: ${action.payload}`
        },

        createNotify(state, action) {
            return `You added: ${action.payload}`
        },
        removeNotify(state, action) {
            return initialState
        }
    }
})

export const {voteNotify, createNotify, removeNotify} = notificationSlice.actions
export default notificationSlice.reducer