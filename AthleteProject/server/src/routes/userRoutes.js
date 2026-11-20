import { Router } from 'express'
import {
  getUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
} from '../controllers/userController.js'

const router = Router()

router.route('/')
  .get(getUsers)

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

router.route('/:id/status')
  .patch(updateUserStatus)
  .put(updateUserStatus)

export default router

