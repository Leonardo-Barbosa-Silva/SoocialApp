import mongoose from 'mongoose';

// USER MONGODB SCHEMA
const usersSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please, add your first name.'],
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: [true, 'Please, add your last name.'],
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: [true, 'Please, add a valid email.'],
            unique: true,
            min: 2,
            max: 70
        },
        password: {
            type: String,
            required: [true, 'Please, add a password.'],
            min: 5
        },
        picturePath: {
            type: String,
            default: ""
        },
        friends: {
            type: Array,
            default: []
        },
        location: {
            type: String,
            default: "",
            max: 20
        },
        ocupation: {
            type: String,
            default: "",
            max: 20
        },
        viewedProfile: {
            type: Number,
            default: 0
        },
        impressions: {
            type: Number,
            default: 0
        }
    }, 
    {
        timestamps: true
    }
)


export default mongoose.model("users", usersSchema)