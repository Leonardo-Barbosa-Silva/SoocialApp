import postsModel from "../../models/posts/postsModel.js";


export default {
    // @desc Create a post
    // @route POST v1/api/posts/create
    // @access Private
    createPost: async (req, res) => {
        try {

            // DESCTRUCTURING BODY REQUEST DATA
            const {
                description,
                picturePath
            } = req.body

            if (!req.user._id) {
                res.status(404).json({ message: "User not logged. Please, login in again." })
                return
            }

            // CREATE A NEW POST
            const postCreated = await postsModel.create({
                userID: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                location: req.user.location,
                description,
                picturePath,
                userPicturePath: req.user.picturePath,
                likes: {},
                comments: []
            })

            res.status(201).json({
                message: "Successfully created a new post.",
                item: postCreated
            })

        } catch (error) {
            console.log(`${error}`.red)

            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: error.message })
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: error.message })
            } else {
                return res.status(409).json({
                    error: "Internal server error. Please, try again later."
                })
            }
        }
    },

    // @desc Get all posts in db
    // @route GET v1/api/posts/all
    // @access Private
    getFeedPosts: async (req, res) => {
        try {

            if (!req.user._id) {
                res.status(404).json({ message: "User not logged. Please, login in again." })
                return
            }

            // GET ALL POSTS IN DB
            const posts = await postsModel.find()

            res.status(201).json({
                item: posts
            })

        } catch (error) {
            console.log(`${error}`.red)
        }
    },

    // @desc Get the user posts
    // @route GET v1/api/posts/user/:userID
    // @access Private
    getUserPosts: async (req, res) => {
        try {

            const { userID } = req.params

            if (!req.user._id) {
                res.status(404).json({ message: "User not logged. Please, login in again." })
                return
            }

            // GET USER POSTS
            const userPosts = await postsModel.find({ userID })

            res.status(201).json({
                item: userPosts
            })

        } catch (error) {
            console.log(`${error}`.red)
            return (
                res.status(409).json({ error: "Internal server error. Please, try again later." })
            )
        }
    },

    // @desc Add or remove user like on posts
    // @route PATCH v1/api/posts/:postID/likes
    // @access Private
    likePosts: async (req, res) => {
        try {

            const { postID } = req.params

            if (!req.user._id) {
                res.status(404).json({ message: "User not logged. Please, login in again." })
                return
            }

            // GET THE POST
            const post = await postsModel.findById(postID)

            // GET USER LIKE ON POST IF EXISTS
            const likeExists = post.likes.get(req.user._id)

            // REMOVE USER LIKE OR ADD IT
            if (likeExists) {
                post.likes.delete(req.user._id)
            } else {
                post.likes.set(req.user._id, true)
            }

            // UPDATE THE POST
            const postUpdated = postsModel.findByIdAndUpdate(
                postID,
                { likes: post.likes },
                { new: true }
            )

            res.status(200).json({
                item: postUpdated
            })

        } catch (error) {
            console.log(`${error}`.red)
            return (
                res.status(409).json({ error: "Internal server error. Please, try again later." })
            )
        }
    }
}