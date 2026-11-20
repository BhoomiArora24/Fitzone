import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET || 'fitzone_jwt_secret_key_2026_super_secure_token'
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  return jwt.sign({ id, role }, secret, { expiresIn })
}

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body

    if (!name || !email || !password) {
      return sendError(res, 'Please provide name, email, and password', 400)
    }

    if (password.length < 6) {
      return sendError(res, 'Password must be at least 6 characters long', 400)
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return sendError(res, 'An account with this email already exists', 409)
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      role: role && ['user', 'member', 'admin'].includes(role) ? role : 'user',
    })

    const token = generateToken(user._id, user.role)

    return sendSuccess(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          membershipStatus: user.membershipStatus,
          joinedClub: user.joinedClub,
          createdAt: user.createdAt,
        },
        token,
      },
      'User registered successfully',
      201
    )
  } catch (error) {
    return sendError(res, error.message || 'Error registering user', 500)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return sendError(res, 'Please provide email and password', 400)
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user) {
      return sendError(res, 'Invalid email or password', 401)
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return sendError(res, 'Invalid email or password', 401)
    }

    const token = generateToken(user._id, user.role)

    return sendSuccess(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar,
          membershipStatus: user.membershipStatus,
          joinedClub: user.joinedClub,
          createdAt: user.createdAt,
        },
        token,
      },
      'Logged in successfully'
    )
  } catch (error) {
    return sendError(res, error.message || 'Error logging in', 500)
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (!user) {
      return sendError(res, 'User not found', 404)
    }
    return sendSuccess(res, { user }, 'Current user retrieved successfully')
  } catch (error) {
    return sendError(res, error.message || 'Error retrieving user profile', 500)
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar, joinedClub } = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
      return sendError(res, 'User not found', 404)
    }

    if (name) user.name = name
    if (phone !== undefined) user.phone = phone
    if (avatar) user.avatar = avatar
    if (joinedClub !== undefined) user.joinedClub = joinedClub

    const updatedUser = await user.save()

    return sendSuccess(
      res,
      {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          phone: updatedUser.phone,
          avatar: updatedUser.avatar,
          membershipStatus: updatedUser.membershipStatus,
          joinedClub: updatedUser.joinedClub,
          updatedAt: updatedUser.updatedAt,
        },
      },
      'Profile updated successfully'
    )
  } catch (error) {
    return sendError(res, error.message || 'Error updating profile', 500)
  }
}

export const logout = async (req, res) => {
  return sendSuccess(res, null, 'Logged out successfully')
}

