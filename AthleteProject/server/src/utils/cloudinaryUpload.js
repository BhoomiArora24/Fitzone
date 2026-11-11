import { Readable } from 'stream'
import cloudinary from '../config/cloudinary.js'

/**
 * Uploads a file buffer (from multer memoryStorage) to Cloudinary
 */
export const uploadBufferToCloudinary = (buffer, folder = 'fitzone/trainers') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [
          { width: 800, height: 800, crop: 'fill', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )

    const stream = Readable.from(buffer)
    stream.pipe(uploadStream)
  })
}

/**
 * Uploads an image URL or Base64 string to Cloudinary
 */
export const uploadSourceToCloudinary = async (source, folder = 'fitzone/trainers') => {
  // If already hosted on Cloudinary, no need to re-upload
  if (typeof source === 'string' && source.includes('cloudinary.com')) {
    return { secure_url: source }
  }

  const result = await cloudinary.uploader.upload(source, {
    folder,
    transformation: [
      { width: 800, height: 800, crop: 'fill', gravity: 'face' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  })

  return result
}

