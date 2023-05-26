import dotenv from 'dotenv';
import express from 'express';
import database from './configs/database.js';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import colors from 'colors'
import { fileURLToPath } from 'url';
import routes from './routes/router.js'

// SERVER CONFIG
dotenv.config()
const PORT = process.env.PORT || 6001
const app = express()

// DIRECTORIES
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// START SERVER
await database(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`.yellow)
    })
})

// MIDDLEWARES CONFIG
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({
    origin: process.env.ALLOWED_FRONT_DOMAIN,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PATCH']
}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// ROUTER MIDDLEWARE
app.use("/social/app", routes)