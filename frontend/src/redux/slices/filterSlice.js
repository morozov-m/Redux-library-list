import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: '',
    author: '',
    onlyFavorite: false
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            return {
                // Билиотека immer позволяет создать новое неизменяемое состояние путем изменеия текущего состояние.
                // Поэтому можно изменять state напрямую, тем самым не нарушая правило Redux, которое запрещает изменять состояние
                ...state, title: action.payload
            }
        },
        setAuthorFilter: (state, action) => {
            state.author = action.payload
        },
        toggleOnlyFavorite: (state) => {
            state.onlyFavorite = !state.onlyFavorite
        },
        resetFilters: () => {
            return initialState
            // state.title = ''
        }
    }
})

export const { setTitleFilter, setAuthorFilter, resetFilters, toggleOnlyFavorite } = filterSlice.actions
// const setTitleFilter = filterSlice.actions.setTitleFilter

export function selectFilter(state) {
    return state.filter
}

// console.log(filterSlice.actions.setTitleFilter('rewsfgd'))
// console.log(filterSlice)
export default filterSlice.reducer