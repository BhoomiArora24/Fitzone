import { Router } from 'express'
import { upload } from '../middlewares/upload.js'
import {
  uploadBufferToCloudinary,
  uploadSourceToCloudinary,
} from '../utils/cloudinaryUpload.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

const router = Router()

/**
 * POST /api/upload
 * Supports:
 * 1. Multipart form-data with file in 'image' field
 * 2. JSON body with 'image' (base64 Data URI or external URL)
 */
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    // 1. File upload
    if (req.file) {
      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        'fitzone/uploads'
      )
      return sendSuccess(
        res,
        {
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          bytes: result.bytes,
        },
        'Image uploaded successfully to Cloudinary',
        201
      )
    }

    // 2. Base64 or external URL upload
    if (req.body.image) {
      const result = await uploadSourceToCloudinary(
        req.body.image,
        'fitzone/uploads'
      )
      return sendSuccess(
        res,
        {
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          bytes: result.bytes,
        },
        'Image uploaded successfully to Cloudinary',
        201
      )
    }

    return sendError(
      res,
      'No image provided. Send a file under key "image" or a JSON body with "image" (URL or base64).',
      400
    )
  } catch (error) {
    next(error)
  }
})

export default router

