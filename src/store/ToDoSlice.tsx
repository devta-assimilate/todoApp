import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getTodoList } from '../api/Api'

interface Todo {
    id: number
    title: string
    completed: boolean
    created_at: string
    updated_at: string
}

export const loadTodos = createAsyncThunk('todos/load', async () => {
    const data = await getTodoList()
    return data.map((t: any) => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }))
})

interface TodoState {
    todos: Todo[]
    filter: 'all' | 'active' | 'done'
    sort: 'recent' | 'id'
}

const initialState: TodoState = {
    todos: [],
    filter: 'all',
    sort: 'recent',
}

const ToDoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const now = new Date().toISOString()
            state.todos.unshift({
                id: Date.now(),
                title: action.payload,
                completed: false,
                created_at: now,
                updated_at: now,
            })
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(t => t.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
                todo.updated_at = new Date().toISOString()
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(t => t.id !== action.payload)
        },
        editTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
            const todo = state.todos.find(t => t.id === action.payload.id)
            if (todo) {
                todo.title = action.payload.title
                todo.updated_at = new Date().toISOString()
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setSort: (state, action) => {
            state.sort = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(loadTodos.fulfilled, (state, action) => {
            state.todos = action.payload
        })
    },
})

export const {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    setSort,
} = ToDoSlice.actions

export default ToDoSlice.reducer
