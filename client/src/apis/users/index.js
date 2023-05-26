import axios from 'axios';


export default axios.create({
    baseURL: "http://localhost:3001/social/v1/api/users"
})