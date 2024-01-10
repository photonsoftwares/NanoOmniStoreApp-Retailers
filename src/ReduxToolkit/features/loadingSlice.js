import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoadingState: (state, action) => {
            state.isLoading = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoadingState } = loadingSlice.actions

export default loadingSlice.reducer