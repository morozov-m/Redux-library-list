const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    title: ''
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
        resetFilters: (state) => {
            return initialState
            // state.title = ''
        }
    }
})

export const { setTitleFilter, resetFilters } = filterSlice.actions
// const setTitleFilter = filterSlice.actions.setTitleFilter

export function selectFilter(state) {
    return state.filter
}

// console.log(filterSlice.actions.setTitleFilter('rewsfgd'))
// console.log(filterSlice)
export default filterSlice.reducer