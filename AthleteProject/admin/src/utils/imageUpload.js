/**
 * Reads an image file as Data URL (Base64) for preview and upload.
 * Validates file size (max 5MB by default) and MIME types.
 */
export const readImageAsDataUrl = (file, maxMb = 5) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file selected'))
    }

    if (!file.type.startsWith('image/')) {
      return reject(new Error('Please select a valid image file (JPEG, PNG, WEBP)'))
    }

    const maxBytes = maxMb * 1024 * 1024
    if (file.size > maxBytes) {
      return reject(new Error(`File size exceeds ${maxMb}MB. Please select a smaller image.`))
    }

    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read image file'))
    reader.readAsDataURL(file)
  })
}

