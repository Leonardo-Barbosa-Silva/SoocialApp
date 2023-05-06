import express from 'express';
import authUserToken from '../../middlewares/auth.js';
import { upload } from '../../configs/multer.js';
import postsControllers from '../../controllers/posts/postsControllers.js';


// DESCTRUCTURING POSTS CONTROLLERS
const {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePosts
} = postsControllers

// EXPRESS ROUTER
const router = express.Router()

// CREATE POST
router.post("/create", authUserToken, upload.single("picture"), createPost)

// GET POSTS
router.get("/all", authUserToken, getFeedPosts)
router.get("/:userID", authUserToken, getUserPosts)

// UPDATE STATUS POSTS
router.patch("/:postID/likes", authUserToken, likePosts)



export default router;