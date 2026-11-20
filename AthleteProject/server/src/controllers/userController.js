import { User } from '../models/User.js'
import { sendSuccess, sendError } from '../utils/apiResponse.js'

// GET /api/users
export const getUsers = async (req, res, next) => {
  try {
    const { search, club, clubMembershipStatus, freePassStatus } = req.query
    const filter = {}

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ]
    }

    if (club) {
      filter.joinedClub = club
    }

    if (clubMembershipStatus) {
      filter.clubMembershipStatus = clubMembershipStatus
    }

    if (freePassStatus) {
      filter.freePassStatus = freePassStatus
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })

    return sendSuccess(res, users, 'Users retrieved successfully')
  } catch (error) {
    next(error)
  }
}

// GET /api/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return sendError(res, 'User not found', 404)
    }
    return sendSuccess(res, user, 'User retrieved successfully')
  } catch (error) {
    next(error)
  }
}

// PUT /api/users/:id
export const updateUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      role,
      joinedClub,
      clubMembershipStatus,
      freePassStatus,
      freePassCode,
      membershipStatus,
    } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return sendError(res, 'User not found', 404)
    }

    if (name) user.name = name
    if (email) user.email = email.toLowerCase()
    if (phone !== undefined) user.phone = phone
    if (role && ['user', 'member', 'admin'].includes(role)) user.role = role
    if (joinedClub !== undefined) user.joinedClub = joinedClub
    if (clubMembershipStatus) user.clubMembershipStatus = clubMembershipStatus
    if (freePassStatus) user.freePassStatus = freePassStatus
    if (freePassCode !== undefined) user.freePassCode = freePassCode
    if (membershipStatus) user.membershipStatus = membershipStatus

    const savedUser = await user.save()
    return sendSuccess(res, savedUser, 'User updated successfully')
  } catch (error) {
    next(error)
  }
}

// PATCH /api/users/:id/status
export const updateUserStatus = async (req, res, next) => {
  try {
    const {
      clubMembershipStatus,
      freePassStatus,
      joinedClub,
      role,
    } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return sendError(res, 'User not found', 404)
    }

    if (clubMembershipStatus !== undefined) {
      user.clubMembershipStatus = clubMembershipStatus
    }
    if (freePassStatus !== undefined) {
      user.freePassStatus = freePassStatus
    }
    if (joinedClub !== undefined) {
      user.joinedClub = joinedClub
    }
    if (role !== undefined && ['user', 'member', 'admin'].includes(role)) {
      user.role = role
    }

    const savedUser = await user.save()
    return sendSuccess(res, savedUser, 'User status updated successfully')
  } catch (error) {
    next(error)
  }
}

// DELETE /api/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return sendError(res, 'User not found', 404)
    }

    await User.findByIdAndDelete(req.params.id)
    return sendSuccess(res, null, 'User deleted successfully')
  } catch (error) {
    next(error)
  }
}

