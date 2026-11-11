import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import app from './app.js'
import { connectDB } from './config/db.js'

// Load environment variables from server/.env regardless of current working directory
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })
dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    // Connect to Database first
    await connectDB()

    // Start HTTP Server
    const server = app.listen(PORT, () => {
      console.log(`===============================================`)
      console.log(` FitZone Backend Server running on port ${PORT}`)
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(` API URL: http://localhost:${PORT}`)
      console.log(` Health Check: http://localhost:${PORT}/api/health`)
      console.log(`===============================================`)
    })

    // Handle process termination gracefully
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received. Closing HTTP server gracefully...')
      server.close(() => {
        console.log('HTTP server closed.')
      })
    })
  } catch (error) {
    console.error(`[Server Start Error] Failed to connect to database: ${error.message}`)
  }
}

startServer()

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection] ${err.message}`)
})
