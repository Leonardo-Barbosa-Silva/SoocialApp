import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { usersService } from './service.js'


// USERS INITIAL STATUS STATE
const initialState = {
    mode: 'light',
    user: null,
    token: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    posts: []
}

// ASYNC THUNK FOR USERS REGISTER
export const registerUser = createAsyncThunk(
    'users/register',
    async (userData, thunkAPI) => {
        try {
            return await usersService.register(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            (error.response && error.response.data && error.response.data.error)

            localStorage.removeItem('userToken')

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// ASYNC THUNK FOR USERS LOGIN
export const loginUser = createAsyncThunk(
    'users/login',
    async (userData, thunkAPI) => {
        try {
            return await usersService.login(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            (error.response && error.response.data && error.response.data.error)

            localStorage.removeItem('userToken')

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// ASYNC THUNK FOR USERS LOGOUT
export const logoutUser = createAsyncThunk(
    'users/logout',
    async (_, { dispatch }) => {
        await usersService.logout()
        dispatch(reset())
    }
)


// USERS SLICE
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        reset: () => initialState,
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        } 
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = ''
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload.item
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.token = null;
                state.message = action.message
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload.item
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.token = null;
                state.message = action.message
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            })
    }
})

export const { reset, setMode } = usersSlice.actions
export default usersSlice.reducer