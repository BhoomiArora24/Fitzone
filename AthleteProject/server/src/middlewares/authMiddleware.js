import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { sendError } from '../utils/apiResponse.js'

export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return sendError(res, 'Not authorized. No token provided.', 401)
  }

  try {
    const secret = process.env.JWT_SECRET || 'fitzone_jwt_secret_key_2026_super_secure_token'
    const decoded = jwt.verify(token, secret)

    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return sendError(res, 'User belonging to this token no longer exists.', 401)
    }

    req.user = user
    next()
  } catch (error) {
    return sendError(res, 'Not authorized. Invalid or expired token.', 401)
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next()
  }
  return sendError(res, 'Access denied. Administrator privileges required.', 403)
}

