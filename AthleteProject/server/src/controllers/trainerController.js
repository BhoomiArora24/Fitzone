import { Trainer } from '../models/Trainer.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'
import {
  uploadBufferToCloudinary,
  uploadSourceToCloudinary,
} from '../utils/cloudinaryUpload.js'

// Fallback seed trainers for immediate offline or fresh DB usage
const defaultTrainers = [
  {
    name: 'Arjun Mehta',
    role: 'Master Trainer',
    specialty: 'Hypertrophy & Bodybuilding',
    experience: '12+ Years Experience',
    clientsCount: 24,
    phone: '+1 (555) 234-5678',
    email: 'arjun.mehta@fitzone.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Rahul Sharma',
    role: 'Strength Coach',
    specialty: 'Powerlifting & Heavy Lifts',
    experience: '8+ Years Experience',
    clientsCount: 18,
    phone: '+1 (555) 345-6789',
    email: 'rahul.sharma@fitzone.com',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Aanya Kapoor',
    role: 'Conditioning Specialist',
    specialty: 'HIIT & Functional Fitness',
    experience: '10+ Years Experience',
    clientsCount: 22,
    phone: '+1 (555) 456-7890',
    email: 'aanya.kapoor@fitzone.com',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Vikram Singh',
    role: 'Performance Coach',
    specialty: 'Olympic Weightlifting',
    experience: '9+ Years Experience',
    clientsCount: 16,
    phone: '+1 (555) 567-8901',
    email: 'vikram.singh@fitzone.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Priya Malhotra',
    role: 'Senior Fitness Coach',
    specialty: 'Fat Loss & Mobility',
    experience: '7+ Years Experience',
    clientsCount: 19,
    phone: '+1 (555) 678-9012',
    email: 'priya.malhotra@fitzone.com',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Rohan Verma',
    role: 'Calisthenics Coach',
    specialty: 'Bodyweight & Core Strength',
    experience: '6+ Years Experience',
    clientsCount: 15,
    phone: '+1 (555) 789-0123',
    email: 'rohan.verma@fitzone.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
  },
]

// GET /api/trainers
export const getTrainers = async (req, res, next) => {
  try {
    let trainers = []
    try {
      trainers = await Trainer.find().sort({ createdAt: -1 })
    } catch {
      trainers = defaultTrainers
    }

    if (!trainers || trainers.length === 0) {
      trainers = defaultTrainers
    }

    return sendSuccess(res, trainers, 'Trainers retrieved successfully')
  } catch (error) {
    next(error)
  }
}

// GET /api/trainers/:id
export const getTrainerById = async (req, res, next) => {
  try {
    const trainer = await Trainer.findById(req.params.id)
    if (!trainer) {
      return sendError(res, 'Trainer not found', 404)
    }
    return sendSuccess(res, trainer, 'Trainer retrieved successfully')
  } catch (error) {
    next(error)
  }
}

// POST /api/trainers
export const createTrainer = async (req, res, next) => {
  try {
    const {
      name,
      role,
      specialty,
      experience,
      phone,
      email,
      clientsCount,
    } = req.body

    let image = req.body.image

    if (!name || !specialty) {
      return sendError(res, 'Name and specialty are required', 400)
    }

    // 1. If file was uploaded via multipart/form-data
    if (req.file) {
      const uploadRes = await uploadBufferToCloudinary(
        req.file.buffer,
        'fitzone/trainers'
      )
      image = uploadRes.secure_url
    }
    // 2. If image URL or base64 data URI was sent in JSON body
    else if (image && typeof image === 'string' && image.trim()) {
      if (!image.includes('cloudinary.com')) {
        try {
          const uploadRes = await uploadSourceToCloudinary(
            image.trim(),
            'fitzone/trainers'
          )
          image = uploadRes.secure_url
        } catch (uploadErr) {
          console.warn(
            '[Cloudinary Warning] Upload failed, keeping provided URL:',
            uploadErr.message
          )
        }
      }
    } else {
      // Default fallback athlete picture
      image =
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85'
    }

    const newTrainer = await Trainer.create({
      name: name.trim(),
      role: role ? role.trim() : 'Fitness Coach',
      specialty: specialty.trim(),
      experience: experience ? experience.trim() : '3+ Years Experience',
      clientsCount: clientsCount ? Number(clientsCount) : 0,
      phone: phone ? phone.trim() : '',
      email: email ? email.trim() : '',
      image,
    })

    return sendSuccess(res, newTrainer, 'Trainer created successfully', 201)
  } catch (error) {
    next(error)
  }
}

// PUT /api/trainers/:id
export const updateTrainer = async (req, res, next) => {
  try {
    const updateData = { ...req.body }

    // If new file uploaded
    if (req.file) {
      const uploadRes = await uploadBufferToCloudinary(
        req.file.buffer,
        'fitzone/trainers'
      )
      updateData.image = uploadRes.secure_url
    }
    // If new image URL or base64 provided
    else if (
      updateData.image &&
      typeof updateData.image === 'string' &&
      !updateData.image.includes('cloudinary.com')
    ) {
      try {
        const uploadRes = await uploadSourceToCloudinary(
          updateData.image.trim(),
          'fitzone/trainers'
        )
        updateData.image = uploadRes.secure_url
      } catch (uploadErr) {
        console.warn(
          '[Cloudinary Warning] Update upload failed:',
          uploadErr.message
        )
      }
    }

    const updated = await Trainer.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updated) {
      return sendError(res, 'Trainer not found', 404)
    }

    return sendSuccess(res, updated, 'Trainer updated successfully')
  } catch (error) {
    next(error)
  }
}

// DELETE /api/trainers/:id
export const deleteTrainer = async (req, res, next) => {
  try {
    const deleted = await Trainer.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return sendError(res, 'Trainer not found', 404)
    }
    return sendSuccess(res, { id: req.params.id }, 'Trainer deleted successfully')
  } catch (error) {
    next(error)
  }
}
