import { Inquiry } from '../models/Inquiry.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

const defaultInquiries = [
  {
    name: 'Alex Morgan',
    email: 'alex.fitness@fitzone.com',
    type: 'Free Pass Claim',
    code: 'FZ-PASS-2026',
    message: '1x Complimentary Personal Training Session voucher generated.',
    status: 'Unclaimed',
  },
  {
    name: 'Sophie Clark',
    email: 'sophie.c@example.com',
    type: 'General Inquiry',
    code: 'INQ-9421',
    message: 'Inquiring about 1-on-1 nutritional guidance and evening powerlifting squad timings.',
    status: 'Responded',
  },
]

// GET /api/inquiries
export const getInquiries = async (req, res, next) => {
  try {
    let inquiries = []
    try {
      inquiries = await Inquiry.find().sort({ createdAt: -1 })
    } catch {
      inquiries = defaultInquiries
    }

    if (!inquiries || inquiries.length === 0) {
      inquiries = defaultInquiries
    }

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

    const newInquiry = await Inquiry.create({
      name,
      email,
      type: type || 'General Inquiry',
      code: code || `FZ-${Math.floor(1000 + Math.random() * 9000)}`,
      message: message || '',
      status: 'Pending',
    })

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

    return sendSuccess(res, updated, 'Inquiry status updated successfully')
  } catch (error) {
    next(error)
  }
}
