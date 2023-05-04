import express from 'express';
import authUserToken from '../../middlewares/auth';
import {
    registerUser,
    loginUser,
    getUser,
    getUserFriends,
    addRemoveFriend
} from '../../controllers/users/usersControllers.js'

// EXPRESS ROUTER
const router = express.Router()

// AUTH USER
router.post("/auth/register", registerUser)
router.post("/auth/login", loginUser)

// USER DATA
router.get("/me", authUserToken, getUser)
router.get("/friends", authUserToken, getUserFriends)

// UPDATE USER DATA
router.patch("/friends/:friendID", authUserToken, addRemoveFriend)


export default router;