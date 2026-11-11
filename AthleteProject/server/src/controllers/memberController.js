import { Member } from '../models/Member.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'
import {
  uploadBufferToCloudinary,
  uploadSourceToCloudinary,
} from '../utils/cloudinaryUpload.js'

const defaultMembers = [
  {
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    phone: '+1 (555) 111-2233',
    membership: 'Club Member',
    status: 'Active',
    assignedTrainer: 'Arjun Mehta',
    joinedDate: new Date('2026-01-15'),
    attendance: '88%',
    avatar: 'https://i.pravatar.cc/80?img=33',
  },
  {
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    phone: '+1 (555) 222-3344',
    membership: 'Personal Training',
    status: 'Active',
    assignedTrainer: 'Aanya Kapoor',
    joinedDate: new Date('2026-02-01'),
    attendance: '95%',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 333-4455',
    membership: 'Free Pass Holder',
    status: 'Pass Claimed',
    assignedTrainer: 'Unassigned',
    joinedDate: new Date('2026-03-10'),
    attendance: '1 Session Left',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 444-5566',
    membership: 'Personal Training',
    status: 'Active',
    assignedTrainer: 'Rahul Sharma',
    joinedDate: new Date('2025-11-20'),
    attendance: '92%',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
]

// GET /api/members
export const getMembers = async (req, res, next) => {
  try {
    let members = []
    try {
      members = await Member.find().sort({ createdAt: -1 })
    } catch {
      members = defaultMembers
    }

    if (!members || members.length === 0) {
      members = defaultMembers
    }

    return sendSuccess(res, members, 'Members retrieved successfully')
  } catch (error) {
    next(error)
  }
}

// GET /api/members/:id
export const getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id)
    if (!member) {
      return sendError(res, 'Member not found', 404)
    }
    return sendSuccess(res, member, 'Member retrieved successfully')
  } catch (error) {
    next(error)
  }
}

// POST /api/members
export const createMember = async (req, res, next) => {
  try {
    const { name, email, phone, membership, assignedTrainer } = req.body
    let avatar = req.body.avatar

    if (!name || !email) {
      return sendError(res, 'Name and email are required', 400)
    }

    // 1. File uploaded via multipart
    if (req.file) {
      const uploadRes = await uploadBufferToCloudinary(
        req.file.buffer,
        'fitzone/members'
      )
      avatar = uploadRes.secure_url
    }
    // 2. Base64 or external URL
    else if (avatar && typeof avatar === 'string' && avatar.trim()) {
      if (!avatar.includes('cloudinary.com')) {
        try {
          const uploadRes = await uploadSourceToCloudinary(
            avatar.trim(),
            'fitzone/members'
          )
          avatar = uploadRes.secure_url
        } catch (uploadErr) {
          console.warn('[Cloudinary Warning] Member avatar upload failed:', uploadErr.message)
        }
      }
    } else {
      avatar = `https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 50) + 1}`
    }

    const newMember = await Member.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      membership: membership || 'Club Member',
      assignedTrainer: assignedTrainer || 'Unassigned',
      avatar,
    })

    return sendSuccess(res, newMember, 'Member registered successfully', 201)
  } catch (error) {
    next(error)
  }
}

// PUT /api/members/:id
export const updateMember = async (req, res, next) => {
  try {
    const updateData = { ...req.body }

    if (req.file) {
      const uploadRes = await uploadBufferToCloudinary(
        req.file.buffer,
        'fitzone/members'
      )
      updateData.avatar = uploadRes.secure_url
    } else if (
      updateData.avatar &&
      typeof updateData.avatar === 'string' &&
      !updateData.avatar.includes('cloudinary.com')
    ) {
      try {
        const uploadRes = await uploadSourceToCloudinary(
          updateData.avatar.trim(),
          'fitzone/members'
        )
        updateData.avatar = uploadRes.secure_url
      } catch (uploadErr) {
        console.warn('[Cloudinary Warning] Member avatar update failed:', uploadErr.message)
      }
    }

    const updated = await Member.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updated) {
      return sendError(res, 'Member not found', 404)
    }

    return sendSuccess(res, updated, 'Member updated successfully')
  } catch (error) {
    next(error)
  }
}

// DELETE /api/members/:id
export const deleteMember = async (req, res, next) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return sendError(res, 'Member not found', 404)
    }
    return sendSuccess(res, { id: req.params.id }, 'Member removed successfully')
  } catch (error) {
    next(error)
  }
}
