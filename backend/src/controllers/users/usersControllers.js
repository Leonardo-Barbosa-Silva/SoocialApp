import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import usersModel from '../../models/users/usersModel.js';
import colors from 'colors';


// GENERATE USER JWT FUNCTION
function jwtGenerate(userID) {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET)
}


export default {

    // @desc Create a new user
    // @route POST v1/api/users/auth/register
    // @access Public
    registerUser: async (req, res) => {
        try {

            const {
                firstName,
                lastName,
                email,
                password,
                picturePath,
                friends,
                location,
                occupation
            } = req.body

            if (!firstName) {
                res.status(400).json({ message: "Please, add your first name." })
                return
            }
            if (!lastName) {
                res.status(400).json({ message: "Please, add your last name." })
                return
            }
            if (!email) {
                res.status(400).json({ message: "Please, add a valid email." })
                return
            }
            if (!password) {
                res.status(400).json({ message: "Please, add a password." })
                return
            }

            const userExists = await usersModel.findOne({ email })

            if (userExists) {
                res.status(400).json({ 
                    message: "User already exists. Please, make login in your account."
                })
                return
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const userCreated = await usersModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                picturePath,
                friends,
                location,
                occupation,
                viewedProfile: Math.floor(Math.random * 10000),
                impressions: Math.floor(Math.random * 10000)
            })
            
            res.status(201).json({
                message: 'User successfully created.',
                item: {
                    _id: userCreated._id,
                    firstName: userCreated.firstName,
                    lastName: userCreated.lastName,
                    email: userCreated.email,
                    picturePath: userCreated.picturePath,
                    friends: userCreated.friends,
                    location: userCreated.location,
                    occupation: userCreated.ocupation,
                    viewedProfile: userCreated.viewedProfile,
                    impressions: userCreated.impressions
                },
                token: jwtGenerate(userCreated._id)
            })

        } catch (error) {
            console.log(`${error}`.red)

            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: error.message })
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: error.message })
            } else {
                return res.status(500).json({
                    error: "Internal server error. Please, try again later."
                })
            }
        }
    },

    // @desc Login user
    // @route POST v1/api/users/auth/login
    // @access Public
    loginUser: async (req, res) => {
        try {

            const { email, password } = req.body

            if (!email) {
                res.status(400).json({ message: "Please, add a valid email." })
                return
            }
            if (!password) {
                res.status(400).json({ message: "Please, add a password." })
                return
            }

            const user = await usersModel.findOne({ email })

            if (!user) {
                res.status(400).json({ message: "User not found." })
                return
            }

            if (!await bcrypt.compare(password, user.password)) {
                return res.status(400).json({ message: 'Invalid credentials.' })
            }
            
            res.status(201).json({
                message: 'User logged successfully.',
                item: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    picturePath: user.picturePath,
                    friends: user.friends,
                    location: user.location,
                    occupation: user.ocupation,
                    viewedProfile: user.viewedProfile,
                    impressions: user.impressions
                },
                token: jwtGenerate(user._id)
            })

        } catch (error) {
            console.log(`${error}`.red)

            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ message: error.message })
            } else if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({ message: error.message })
            } else {
                return res.status(500).json({
                    error: "Internal server error. Please, try again later."
                })
            }
        }
    },

    // @desc Get user data
    // @route GET v1/api/users/me
    // @access Private
    getUser: async (req, res) => {
        try {

            if (!req.user._id) {
                res.status(404).json({ message: "User not found." })
                return
            }
            
            res.status(200).json({
                message: 'Successfully get user data.',
                item: {
                    _id: req.user._id,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    email: req.user.email,
                    picturePath: req.user.picturePath,
                    friends: req.user.friends,
                    location: req.user.location,
                    occupation: req.user.ocupation,
                    viewedProfile: req.user.viewedProfile,
                    impressions: req.user.impressions
                }
            })

        } catch (error) {
            console.log(`${error}`.red)
            return res.status(500).json({
                error: "Internal server error. Please, try again later."
            })
        }
    },

    // @desc Get user friends
    // @route GET v1/api/users/friends
    // @access Private
    getUserFriends: async (req, res) => {
        try {

            if (!req.user._id) {
                res.status(404).json({ message: "User not found." })
                return
            }

            // CATCH USER FRIENDS
            const friends = await Promise.all(
                req.user.friends.map( async (id) => await usersModel.findById(id) )
            )

            // FORMAT OBJECT THAT REPRESENTS THE USER FRIENDS
            const friendsFormatted = friends.map(
                ({ _id, firstName, lastName, email, occupation, location, picturePath }) => (
                    { _id, firstName, lastName, email, occupation, location, picturePath }
                )
            )
            
            res.status(200).json({
                message: 'Successfully get user friends.',
                item: friendsFormatted
            })

        } catch (error) {
            console.log(`${error}`.red)
            return res.status(500).json({
                error: "Internal server error. Please, try again later."
            })
        }
    },

    // @desc Add or delete user friend
    // @route PATCH v1/api/users/friends/:friendID
    // @access Private
    addRemoveFriend: async (req, res) => {
        try {

            // CATCH THE USER FRIEND ID
            const friendID = req.params

            if (!req.user._id) {
                res.status(404).json({ message: "User not found." })
                return
            }

            const friend = await usersModel.findById(friendID)

            if (!friend) {
                return res.status(404).json({ message: "Friend not found." })
            }

            // REMOVE OR ADD USER FRIEND
            if (req.user.friends.includes(friendID)) {
                req.user.friends = req.user.friends.filter( (id) => id !== friendID )
                friend.friends = friend.friends.filter( (id) => id !== req.user._id )
            } else {
                req.user.friends.push(friend._id)
                friend.friends.push(req.user_id)
            }

            // SAVE USERS MODELS UPDATE
            await req.user.save()
            await friend.save()

            // CATCH USER FRIENDS
            const userFriends = await Promise.all(
                req.user.friends.map( async (id) => await usersModel.findById(id) )
            )
            
            // FORMAT OBJECT THAT REPRESENTS THE USER FRIENDS
            const friendsFormatted = userFriends.map(
                ({ _id, firstName, lastName, email, occupation, location, picturePath }) => (
                    { _id, firstName, lastName, email, occupation, location, picturePath }
                )
            )

            res.status(200).json({
                item: friendsFormatted
            })

        } catch (error) {
            console.log(`${error}`.red)
            return res.status(500).json({
                error: "Internal server error. Please, try again later."
            })
        }
    }
}