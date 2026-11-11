import { Router } from 'express'
import {
  getClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
} from '../controllers/clubController.js'
import { upload } from '../middlewares/upload.js'

const router = Router()

router.route('/')
  .get(getClubs)
  .post(upload.single('image'), createClub)

router.route('/:id')
  .get(getClubById)
  .put(upload.single('image'), updateClub)
  .delete(deleteClub)

export default router
