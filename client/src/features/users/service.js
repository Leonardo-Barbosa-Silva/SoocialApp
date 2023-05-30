import usersAPI from '../../apis/users/index.js';


const register = async (userData) => {
    return await usersAPI.post('/auth/register', userData)
}

const login = async (userData) => {
    return await usersAPI.post('/auth/login', userData)
}

const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}


export const usersService = {
    register,
    login,
    logout
}