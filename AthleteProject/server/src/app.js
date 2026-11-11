import express from 'express'
import cors from 'cors'
import trainerRoutes from './routes/trainerRoutes.js'
import memberRoutes from './routes/memberRoutes.js'
import clubRoutes from './routes/clubRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

// Dynamic CORS configuration
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174']

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(null, true) // Permissive for local dev testing
      }
    },
    credentials: true,
  })
)

// Body parsers with 10mb limit for base64 images
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Root / Welcome Route
app.get('/', (req, res) => {
  res.json({
    name: 'FitZone Gym & Fitness Club API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: '/api/health',
      trainers: '/api/trainers',
      members: '/api/members',
      clubs: '/api/clubs',
      inquiries: '/api/inquiries',
      upload: '/api/upload',
    },
  })
})

// System Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Core API Routes
app.use('/api/trainers', trainerRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/clubs', clubRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/upload', uploadRoutes)

// Error Handling Middlewares
app.use(notFound)
app.use(errorHandler)

export default app
