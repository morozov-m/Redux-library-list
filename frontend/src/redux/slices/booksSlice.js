const { createSlice } = require("@reduxjs/toolkit")

const initialState = []

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload)
        },
        toggleFavorite: (state, action) => {
            return state.map(book => book.id === action.payload ? {
                ...book,
                isFavorite: !book.isFavorite
            } : book)
        },
        deleteBook: (state, action) => {
            return state.filter(book => book.id !== action.payload)
        }
    }
})

export const { addBook, toggleFavorite, deleteBook } = booksSlice.actions

export function selectBooks(state) {
    return state.books
}

export default booksSlice.reducer