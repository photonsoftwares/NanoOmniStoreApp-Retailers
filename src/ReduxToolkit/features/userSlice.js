import { createSlice,  } from '@reduxjs/toolkit'

const initialState = {
    user: 'danish',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state) => {
            state.user
        },

    },
})

export const { logIn } = userSlice.actions
// export const selectUser = (state) => state.user.user;
export const selectUserInfo = (state) => state.user.user;

// console.log('first',selectUser)


export default userSlice.reducer