import express from 'express';
import usersRoutes from './users/usersRoutes.js'

// EXPRESS ROUTER
const router = express.Router()

// DIRECT USER ROUTES
router.post("v1/api/users", usersRoutes)



export default router;