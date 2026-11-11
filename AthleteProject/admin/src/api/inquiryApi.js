import api from './axiosInstance'
import { API_ENDPOINTS } from './endpoints'

export const inquiryApi = {
  getAll: () => api.get(API_ENDPOINTS.INQUIRIES),
  getById: (id) => api.get(`${API_ENDPOINTS.INQUIRIES}/${id}`),
  create: (inquiryData) => api.post(API_ENDPOINTS.INQUIRIES, inquiryData),
  updateStatus: (id, status) => api.put(`${API_ENDPOINTS.INQUIRIES}/${id}/status`, { status }),
  delete: (id) => api.delete(`${API_ENDPOINTS.INQUIRIES}/${id}`),
}
