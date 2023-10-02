import express from 'express'
import routes from '../routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connect from '../utils/connect'
import logger from '../utils/logger'
import dotenv from 'dotenv'
dotenv.config()

import config from 'config'
const port = config.get<number>('port')
function createServer() {
  const app = express()
  console.log(`test${typeof app}`)
  app.use(express.json())
  app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
  app.use(cookieParser())

  routes(app)

  return app
}

export default createServer
