import { Inquiry } from '../models/Inquiry.js'
import { User } from '../models/User.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

// GET /api/inquiries
export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    return sendSuccess(res, inquiries, 'Inquiries retrieved successfully')
  } catch (error) {
    next(error)
  }
}

// POST /api/inquiries
export const createInquiry = async (req, res, next) => {
  try {
    const { name, email, type, code, message } = req.body

    if (!name || !email) {
      return sendError(res, 'Name and email are required', 400)
    }

    const initialStatus = type === 'Free Pass Claim' ? 'Claimed' : 'Pending'
    const newInquiry = await Inquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      type: type || 'General Inquiry',
      code: code || `FZ-${Math.floor(1000 + Math.random() * 9000)}`,
      message: message || '',
      status: initialStatus,
    })

    // If it is a Free Pass Claim, sync to registered user if one exists
    if (type === 'Free Pass Claim') {
      try {
        await User.findOneAndUpdate(
          { email: email.trim().toLowerCase() },
          { freePassStatus: 'Claimed', freePassCode: newInquiry.code }
        )
      } catch {
        // User may be guest
      }
    }

    return sendSuccess(res, newInquiry, 'Inquiry submitted successfully', 201)
  } catch (error) {
    next(error)
  }
}

// PUT /api/inquiries/:id/status
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const updated = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!updated) {
      return sendError(res, 'Inquiry not found', 404)
    }

    // Sync Free Pass status to User collection if applicable
    if (updated.type === 'Free Pass Claim' && (status === 'Used' || status === 'Claimed')) {
      try {
        await User.findOneAndUpdate(
          {
            $or: [
              { email: updated.email.toLowerCase() },
              { freePassCode: updated.code },
            ],
          },
          { freePassStatus: status }
        )
      } catch (err) {
        console.warn('Syncing pass status to user failed:', err.message)
      }
    }

    return sendSuccess(res, updated, 'Inquiry status updated successfully')
  } catch (error) {
    next(error)
  }
}

// DELETE /api/inquiries/:id
export const deleteInquiry = async (req, res, next) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return sendError(res, 'Inquiry not found', 404)
    }
    return sendSuccess(res, { id: req.params.id }, 'Inquiry deleted successfully')
  } catch (error) {
    next(error)
  }
}
