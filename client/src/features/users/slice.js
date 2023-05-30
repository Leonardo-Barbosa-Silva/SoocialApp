import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { usersService } from './service.js'


const initialState = {
    mode: 'light',
    user: null,
    token: null,
    isRegistered: false,
    isLogged: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    posts: []
}


export const registerUser = createAsyncThunk(
    'users/register',
    async (userData, thunkAPI) => {
        try {
            return await usersService.register(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            (error.response && error.response.data && error.response.data.error)

            localStorage.removeItem('user')
            localStorage.removeItem('token')

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const loginUser = createAsyncThunk(
    'users/login',
    async (userData, thunkAPI) => {
        try {
            return await usersService.login(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            (error.response && error.response.data && error.response.data.error)

            localStorage.removeItem('user')
            localStorage.removeItem('token')

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const logoutUser = createAsyncThunk(
    'users/logout',
    async (_, { dispatch }) => {
        await usersService.logout()
        dispatch(reset())
    }
)


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        reset: () => initialState,
        resetMessage: (state) => { 
            state.message = ''
        },
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        } 
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action)
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload.data.item
                state.token = action.payload.data.token
                state.isRegistered = true
                state.isLogged = false
                state.message = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.user = null
                state.token = null
                state.message = action.payload
                state.isRegistered = false
                state.isLogged = false
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload.data.item
                state.token = action.payload.data.token
                state.isRegistered = true
                state.isLogged = true
                state.message = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.user = null
                state.token = null
                state.message = action.payload
                state.isRegistered = false
                state.isLogged = false
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.isRegistered = false
                state.isLogged = false
                state.message = ''
            })
    }
})

export const { reset, setMode, resetMessage } = usersSlice.actions
export default usersSlice.reducer