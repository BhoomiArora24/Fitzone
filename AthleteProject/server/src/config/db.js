import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI

    if (!mongoUri) {
      throw new Error('MONGO_URI is missing. Check your server/.env file.')
    }

    const conn = await mongoose.connect(mongoUri)

    console.log(
      `[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`
    )
  } catch (error) {
    console.error(`[Database Error] ${error.message}`)
    throw error
  }
}