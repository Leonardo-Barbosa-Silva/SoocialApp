import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import usersModel from '../../models/users/usersModel';
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
                ocupation
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
                ocupation,
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
                    ocupation: userCreated.ocupation,
                    viewedProfile: userCreated.viewedProfile,
                    impressions: userCreated.impressions
                },
                token: jwtGenerate(userCreated._id)
            })

        } catch (error) {
            console.log(`${error}`.red)

            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).json({ message: error.message })
            } else if (error instanceof mongoose.Error.CastError) {
                res.status(400).json({ message: error.message })
            } else {
                res.status(500).json({
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

            const userExists = await usersModel.findOne({ email })

            if (!userExists) {
                res.status(400).json({ message: "User do not exists." })
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
                ocupation,
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
                    ocupation: userCreated.ocupation,
                    viewedProfile: userCreated.viewedProfile,
                    impressions: userCreated.impressions
                },
                token: jwtGenerate(userCreated._id)
            })

        } catch (error) {
            console.log(`${error}`.red)

            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).json({ message: error.message })
            } else if (error instanceof mongoose.Error.CastError) {
                res.status(400).json({ message: error.message })
            } else {
                res.status(500).json({
                    error: "Internal server error. Please, try again later."
                })
            }
        }
    },
}