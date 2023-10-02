import app from './app'
import routes from './routes'
import connect from './utils/connect'
import config from 'config'
import logger from './utils/logger'
const port = config.get<number>('port')
app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`)

  await connect()
})
