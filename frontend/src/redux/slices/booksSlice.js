import axios from 'axios'
import { createSlice } from "@reduxjs/toolkit"
import { createBookWithId } from '../../utils/createBookWithId'

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

export async function thunkFunction(dispatch, getState) {
    try {
        const res = await axios.get('http://localhost:4000/random-book')
        if (res?.data?.title && res?.data?.author) {
            dispatch(addBook(createBookWithId(res.data, 'api')))
        }
    } catch (error) {
        console.log('Error fetching random book', error)
    }
}

export function selectBooks(state) {
    return state.books
}

export default booksSlice.reducer