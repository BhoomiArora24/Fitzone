import { Router } from 'express'
import {
  getTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} from '../controllers/trainerController.js'
import { upload } from '../middlewares/upload.js'

const router = Router()

router.route('/')
  .get(getTrainers)
  .post(upload.single('image'), createTrainer)

router.route('/:id')
  .get(getTrainerById)
  .put(upload.single('image'), updateTrainer)
  .delete(deleteTrainer)

export default router
