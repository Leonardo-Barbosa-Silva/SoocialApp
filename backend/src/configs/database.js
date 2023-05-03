import mongoose from 'mongoose';
import dotenv from 'dotenv';

// ACCESS ENVIROMENT VARIABLES
dotenv.config()

// MONGODB USER CREDENTIALS
const USER_NAME = process.env.USER_NAME
const USER_PASSWORD = encodeURIComponent(process.env.USER_PASSWORD)

// CONNECT MONGODB DATABASE
const connectDB = async (server) => {
    mongoose.connect(
        `mongodb+srv://${USER_NAME}:${USER_PASSWORD}@social-cluster.82h9wfa.mongodb.net/db`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then( (conn) => {
        server()
        console.log(`Database is running on: ${conn.connection.host}`.yellow)
    }).catch( (error) => {
        console.log(`${error}`.red)
        process.exit(1)
    })
}


export default connectDB;