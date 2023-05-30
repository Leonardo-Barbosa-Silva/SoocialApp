import express from 'express';
import usersRoutes from './users/usersRoutes.js'
import postsRoutes from './posts/postsRoutes.js'

// EXPRESS ROUTER
const router = express.Router()

// DIRECT USER ROUTES
router.use("/v1/api/users", usersRoutes)

// DIRECT POST ROUTES
router.use("/v1/api/posts", postsRoutes)

router.use("/v1/api/posts", postsRoutes)

export default router;