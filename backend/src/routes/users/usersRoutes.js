import express from 'express';
import { registerUser, loginUser } from '../../controllers/users/usersControllers.js'

// EXPRESS ROUTER
const router = express.Router()

// DIRECT USERS CONTROLLERS
router.post("/auth/register", registerUser)
router.post("/auth/login", loginUser)



export default router;