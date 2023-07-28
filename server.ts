import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

import UtilController from './src/controllers/v1/Util.controller'
import rateLimiter from './src/middlewares/RateLimiter.middleware'
import requestLogger from './src/middlewares/Log.middleware'

dotenv.config()
export const PORT: number = parseInt(process.env.port ? process.env.port : '8000')
// const MONGO_URI: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_URI}/${process.env.MONGO_DBNAME}`

// TODO: organize this elsewhere. Supertest scoping.
export const makeServer = () => {
  const app: express.Application = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(rateLimiter({
    windowMs: 1000,
    maxRequests: process.env.NODE_ENV === 'test' ? 999999999 : 1 // TODO give this a test .env instead
  }))
  app.use(requestLogger)
  app.use('/apiv1', new UtilController().getRouter())
  return app
}

if (process.env.NODE_ENV !== 'test') {
  console.log("I AM CONNECTING")
  // mongoose.connect(MONGO_URI).then((value: typeof mongoose) => {
    const app = makeServer()
    app.listen(PORT, () => {
      console.log(`AltF7 Server is running at http://localhost:${PORT}`)
    })
  // }).catch((e) => { console.error(e) }).finally()
}
