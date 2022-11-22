import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'

dotenv.config()

connectDB()

const app = express()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders:
      'Access-Control-Allow-Origin, Content-Type, Authorization, Origin, X-Requested-With, Accept',
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  // PORT,
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port 5000`.yellow.bold
  )
)
