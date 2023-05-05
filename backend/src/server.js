import dotenv from 'dotenv';
import express from 'express';
import database from './configs/database.js';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer'
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
app.use(cors())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// ROUTES MIDDLEWARES
app.use(routes)