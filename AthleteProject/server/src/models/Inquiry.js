import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ['Free Pass Claim', 'General Inquiry', 'Membership Inquiry', 'Personal Training'],
      default: 'General Inquiry',
    },
    code: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Unclaimed', 'Responded', 'Pending', 'Closed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
)

export const Inquiry = mongoose.model('Inquiry', inquirySchema)
