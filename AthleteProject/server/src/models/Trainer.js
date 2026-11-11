import mongoose from 'mongoose'

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Trainer name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role / Title is required'],
      default: 'Fitness Coach',
    },
    specialty: {
      type: String,
      required: [true, 'Specialty is required'],
      trim: true,
    },
    experience: {
      type: String,
      default: '3+ Years Experience',
    },
    clientsCount: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85',
    },
  },
  {
    timestamps: true,
  }
)

export const Trainer = mongoose.model('Trainer', trainerSchema)
