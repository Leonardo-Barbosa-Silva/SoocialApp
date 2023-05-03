import express from 'express';
import registerUser from '../../controllers/users/usersControllers.js'

// EXPRESS ROUTER
const router = express.Router()

// DIRECT USERS CONTROLLERS
router.post("/register", registerUser)



export default router;