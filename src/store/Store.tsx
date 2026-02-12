import { configureStore } from '@reduxjs/toolkit'
import ToDoSlice from './ToDoSlice'

export const store = configureStore({
    reducer: { todos: ToDoSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
