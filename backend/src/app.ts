import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import logger from './utils/logger'
import fs from 'fs'

import cookieParser from 'cookie-parser'

import cors from 'cors'
import userRoutes from './routes/userRoutes'
import sessionRoutes from './routes/sessionRoutes'
import productRoutes from './routes/productRoutes'
import root from './routes/root'

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
app.use(cookieParser())
app.use(root)
app.use(userRoutes)
app.use(sessionRoutes)
app.use(productRoutes)
export default app
