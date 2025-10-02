const { createSlice } = require("@reduxjs/toolkit")

const initialState = ''

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            state = action.payload
            return state
        },
        clearError: () => {
            return initialState
        }
    }
}
)

export const { setError, clearError } = errorSlice.actions

export function selectError(state) {
    return state.error
}

export default errorSlice.reducer