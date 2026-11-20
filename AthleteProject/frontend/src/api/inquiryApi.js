import api from './axiosInstance'

export const inquiryApi = {
  create: (data) => api.post('/inquiries', data),
  getAll: () => api.get('/inquiries'),
  getById: (id) => api.get(`/inquiries/${id}`),
}

export default inquiryApi

