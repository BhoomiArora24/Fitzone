import { Club } from '../models/Club.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'
import {
  uploadBufferToCloudinary,
  uploadSourceToCloudinary,
} from '../utils/cloudinaryUpload.js'

const defaultClubs = [
  {
    name: 'Barbell Club',
    sport: 'Strength & Power',
    coach: 'Arjun Mehta',
    schedule: 'Mon / Wed / Fri · 6:30 PM',
    membersCount: 28,
    maxCapacity: 35,
    status: 'Active',
    intensity: 'High',
    description: 'Specialized barbell cycling, progressive compound lifts, and technique mastery.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'MetCon Squad',
    sport: 'HIIT & Conditioning',
    coach: 'Aanya Kapoor',
    schedule: 'Tue / Thu · 7:00 AM',
    membersCount: 32,
    maxCapacity: 32,
    status: 'Full',
    intensity: 'Extreme',
    description: 'High-octane metabolic intervals, rowing, air bikes, and kettlebell circuits.',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Bodybuilding Crew',
    sport: 'Hypertrophy',
    coach: 'Arjun Mehta',
    schedule: 'Mon / Tue / Thu · 5:30 PM',
    membersCount: 22,
    maxCapacity: 25,
    status: 'Active',
    intensity: 'High',
    description: 'Targeted muscle isolation, volume periodization, and aesthetic physique sculpting.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85',
  },
]

// GET /api/clubs
export const getClubs = async (req, res, next) => {
  try {
    let clubs = []
    try {
      clubs = await Club.find().sort({ createdAt: -1 })
    } catch {
      clubs = defaultClubs
    }

    if (!clubs || clubs.length === 0) {
      clubs = defaultClubs
    }

    return sendSuccess(res, clubs, 'Workout clubs retrieved successfully')
  } catch (error) {
    next(error)
  }
}

// GET /api/clubs/:id
export const getClubById = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id)
    if (!club) {
      return sendError(res, 'Club not found', 404)
    }
    return sendSuccess(res, club, 'Club retrieved successfully')
  } catch (error) {
    next(error)
  }
}

// POST /api/clubs
export const createClub = async (req, res, next) => {
  try {
    const { name, sport, coach, schedule, maxCapacity, intensity, description } = req.body
    let image = req.body.image

    if (!name || !sport || !coach || !schedule) {
      return sendError(res, 'Name, sport, coach, and schedule are required', 400)
    }

    // 1. File uploaded via multipart
    if (req.file) {
      const uploadRes = await uploadBufferToCloudinary(
        req.file.buffer,
        'fitzone/clubs'
      )
      image = uploadRes.secure_url
    }
    // 2. Base64 or external URL
    else if (image && typeof image === 'string' && image.trim()) {
      if (!image.includes('cloudinary.com')) {
        try {
          const uploadRes = await uploadSourceToCloudinary(
            image.trim(),
            'fitzone/clubs'
          )
          image = uploadRes.secure_url
        } catch (uploadErr) {
          console.warn('[Cloudinary Warning] Club image upload failed:', uploadErr.message)
        }
      }
    } else {
      image =
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85'
    }

    const newClub = await Club.create({
      name: name.trim(),
      sport: sport.trim(),
      coach: coach.trim(),
      schedule: schedule.trim(),
      maxCapacity: maxCapacity ? Number(maxCapacity) : 30,
      intensity: intensity || 'High',
      description: description || '',
      image,
    })

    return sendSuccess(res, newClub, 'Club created successfully', 201)
  } catch (error) {
    next(error)
  }
}

// PUT /api/clubs/:id
export const updateClub = async (req, res, next) => {
  try {
    const updateData = { ...req.body }

    if (req.file) {
      const uploadRes = await uploadBufferToCloudinary(
        req.file.buffer,
        'fitzone/clubs'
      )
      updateData.image = uploadRes.secure_url
    } else if (
      updateData.image &&
      typeof updateData.image === 'string' &&
      !updateData.image.includes('cloudinary.com')
    ) {
      try {
        const uploadRes = await uploadSourceToCloudinary(
          updateData.image.trim(),
          'fitzone/clubs'
        )
        updateData.image = uploadRes.secure_url
      } catch (uploadErr) {
        console.warn('[Cloudinary Warning] Club image update failed:', uploadErr.message)
      }
    }

    const updated = await Club.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updated) {
      return sendError(res, 'Club not found', 404)
    }

    return sendSuccess(res, updated, 'Club updated successfully')
  } catch (error) {
    next(error)
  }
}

// DELETE /api/clubs/:id
export const deleteClub = async (req, res, next) => {
  try {
    const deleted = await Club.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return sendError(res, 'Club not found', 404)
    }
    return sendSuccess(res, { id: req.params.id }, 'Club deleted successfully')
  } catch (error) {
    next(error)
  }
}
