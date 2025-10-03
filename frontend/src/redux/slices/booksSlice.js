import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBookWithId } from '../../utils/createBookWithId'
import { setError } from './errorSlice'

const initialState = {
    books: [],
    isLoadingViaAPI: false
}

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url)
            return res.data
        }
        catch (error) {
            thunkAPI.dispatch(setError(error.message))
            // return thunkAPI.rejectWithValue(error)
            throw error
        }
    }
)

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        deleteBook: (state, action) => {
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload)
            }
        },
        toggleFavorite: (state, action) => {
            // thanks, immer
            state.books.forEach(book => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite
                }
            })
            // return state.books.map(book => book.id === action.payload ? {
            //     ...book,
            //     isFavorite: !book.isFavorite
            // } : book)
        }
    },
    // Один из вариантов создания extraReducers
    // extraReducers: {
    //     [fetchBook.fulfilled]: (state, action) => {
    //         if (action.payload.title && action.payload.author) {
    //             state.books.push(createBookWithId(action.payload, 'api'))
    //         }
    //     },
    // }

    // Еще один из вариантов создания extraReducers
    extraReducers: builder => {
        builder.addCase(fetchBook.pending, (state) => {
            state.isLoadingViaAPI = true
        })
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            state.isLoadingViaAPI = false
            if (action?.payload?.title && action?.payload?.author) {
                state.books.push(createBookWithId(action.payload, 'api'))
            }
        })
        builder.addCase(fetchBook.rejected, (state) => {
            state.isLoadingViaAPI = false
        })
    }
})

export const { addBook, toggleFavorite, deleteBook } = booksSlice.actions


// Thunk функция до интеграции в Redux slice, передается через обычный dispatch в другом месте приложения
// export async function thunkFunction(dispatch, getState) {
//     try {
//         const res = await axios.get('http://localhost:4000/random-book')
//         if (res?.data?.title && res?.data?.author) {
//             dispatch(addBook(createBookWithId(res.data, 'api')))
//         }
//     } catch (error) {
//         console.log('Error fetching random book', error)
//     }
// }

export function selectBooks(state) {
    return state.books.books
}

export function selectIsLoadingViaAPI(state) {
    return state.books.isLoadingViaAPI
}

export default booksSlice.reducer