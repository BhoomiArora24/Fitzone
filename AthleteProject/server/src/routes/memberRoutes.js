import { Router } from 'express'
import {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from '../controllers/memberController.js'
import { upload } from '../middlewares/upload.js'

const router = Router()

router.route('/')
  .get(getMembers)
  .post(upload.single('avatar'), createMember)

router.route('/:id')
  .get(getMemberById)
  .put(upload.single('avatar'), updateMember)
  .delete(deleteMember)

export default router
