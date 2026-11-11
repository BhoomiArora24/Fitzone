import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
    },
    membership: {
      type: String,
      enum: ['Club Member', 'Personal Training', 'Free Pass Holder'],
      default: 'Club Member',
    },
    status: {
      type: String,
      enum: ['Active', 'Pass Claimed', 'Pending Renewal', 'Inactive'],
      default: 'Active',
    },
    assignedTrainer: {
      type: String,
      default: 'Unassigned',
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    attendance: {
      type: String,
      default: '100%',
    },
    avatar: {
      type: String,
      default: 'https://i.pravatar.cc/80?img=12',
    },
  },
  {
    timestamps: true,
  }
)

export const Member = mongoose.model('Member', memberSchema)
