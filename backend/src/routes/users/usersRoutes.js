import express from 'express';
import authUserToken from '../../middlewares/auth.js';
import usersControllers from '../../controllers/users/usersControllers.js';
import { upload } from '../../configs/multer.js';


// EXPRESS ROUTER
const router = express.Router()

// DESCTRUCTURING USERS CONTROLLERS
const {
    registerUser,
    loginUser,
    getUser,
    getUserFriends,
    addRemoveFriend
} = usersControllers;

// AUTH USER
router.post("/auth/register", upload.single("picture"), registerUser)
router.post("/auth/login", loginUser)

// GET USER DATA AND FRIENDS
router.get("/me", authUserToken, getUser)
router.get("/friends", authUserToken, getUserFriends)

// UPDATE USER DATA AND FRIENDS
router.patch("/friends/:friendID", authUserToken, addRemoveFriend)


export default router;