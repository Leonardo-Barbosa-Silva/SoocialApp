import usersAPI from '../../apis/users/index.js';


// USERS REGISTER
const register = async (userData) => {
    const resp = await usersAPI.post('/register', userData)

    if (resp.status === 201) {
        localStorage.setItem('userToken', resp.data.token)
    }

    return resp.data
}


// USERS LOGIN
const login = async (userData) => {
    const resp = await usersAPI.post('/login', userData)

    if (resp.status === 200) {
        localStorage.setItem('userToken', resp.data.token)
    }

    return resp.data
}


// USERS LOGOUT
const logout = async (userData) => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}



export const usersService = {
    register,
    login,
    logout
}