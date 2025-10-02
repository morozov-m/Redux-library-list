import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload)
        },
        deleteBook: (state, action) => {
            return state.filter(book => book.id !== action.payload)
        },
        toggleFavorite: (state, action) => {
            // thanks, immer
            state.forEach(book => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite
                }
            })
            // return state.map(book => book.id === action.payload ? {
            //     ...book,
            //     isFavorite: !book.isFavorite
            // } : book)
        }

    }
})

export const { addBook, toggleFavorite, deleteBook } = booksSlice.actions

export function selectBooks(state) {
    return state.books
}

export default booksSlice.reducer