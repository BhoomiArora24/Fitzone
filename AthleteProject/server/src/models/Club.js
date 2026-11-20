import mongoose from 'mongoose'

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Club name is required'],
      trim: true,
    },
    sport: {
      type: String,
      required: [true, 'Discipline or Sport is required'],
    },
    coach: {
      type: String,
      required: [true, 'Lead Coach is required'],
    },
    schedule: {
      type: String,
      required: [true, 'Schedule is required'],
    },
    membersCount: {
      type: Number,
      default: 0,
    },
    maxCapacity: {
      type: Number,
      default: 30,
    },
    status: {
      type: String,
      enum: ['Active', 'Full', 'Paused'],
      default: 'Active',
    },
    intensity: {
      type: String,
      default: 'High',
    },
    description: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'Main Gym Floor - Zone A',
    },
    duration: {
      type: String,
      default: '60 Mins / Session',
    },
    targetAudience: {
      type: String,
      default: 'All Fitness Levels',
    },
    prerequisites: {
      type: String,
      default: 'Open to all gym members & pass holders',
    },
    perks: {
      type: [String],
      default: [
        'Dedicated Coach Supervision',
        'Progressive Overload Tracking',
        'Form Correction & Video Feedback',
        'Reserved Equipment Access',
      ],
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
    },
  },
  {
    timestamps: true,
  }
)

export const Club = mongoose.model('Club', clubSchema)
