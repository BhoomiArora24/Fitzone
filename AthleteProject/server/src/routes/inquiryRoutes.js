import { Router } from 'express'
import {
  getInquiries,
  createInquiry,
  updateInquiryStatus,
} from '../controllers/inquiryController.js'

const router = Router()

router.route('/')
  .get(getInquiries)
  .post(createInquiry)

router.route('/:id/status')
  .put(updateInquiryStatus)

export default router
