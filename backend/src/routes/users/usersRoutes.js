import express from 'express';
import { registerUser, loginUser } from '../../controllers/users/usersControllers.js'

// EXPRESS ROUTER
const router = express.Router()

// DIRECT USERS CONTROLLERS
router.post("/register", registerUser)
router.post("/login", loginUser)



export default router;