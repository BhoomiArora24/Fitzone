import { Router } from 'express'
import {
  getInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js'

const router = Router()

router.route('/')
  .get(getInquiries)
  .post(createInquiry)

router.route('/:id')
  .delete(deleteInquiry)

router.route('/:id/status')
  .put(updateInquiryStatus)
  .patch(updateInquiryStatus)

export default router
