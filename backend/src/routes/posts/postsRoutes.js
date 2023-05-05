
import express from 'express';
/*
import authUserToken from '../../middlewares/auth.js';
import { upload } from '../../server.js'
import {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePosts
} from '../../controllers/posts/postsControllers';
*/

// EXPRESS ROUTER
const router = express.Router()
/*
// CREATE POST
router.post("/create", authUserToken, upload.single("picture"), createPost)

// GET POSTS
router.get("/me", authUserToken, getFeedPosts)
router.get("/:userID", authUserToken, getUserPosts)

// UPDATE STATUS POSTS
router.patch("/:id/likes", authUserToken, likePosts)



*/
export default router;