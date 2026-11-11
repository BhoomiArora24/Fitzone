import multer from 'multer'

// Use memory storage so file is buffered directly for Cloudinary streaming
const storage = multer.memoryStorage()

// Validate file type
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(
      new Error(
        'Invalid file type. Only JPG, JPEG, PNG, and WebP images are allowed.'
      ),
      false
    )
  }
}

// 5MB file size limit
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
})

