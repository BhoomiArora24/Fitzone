import api from './axiosInstance'
import { API_ENDPOINTS } from './endpoints'

export const clubApi = {
  getAll: () => api.get(API_ENDPOINTS.CLUBS),
  getById: (id) => api.get(`${API_ENDPOINTS.CLUBS}/${id}`),
  create: (clubData) => api.post(API_ENDPOINTS.CLUBS, clubData),
  update: (id, updateData) => api.put(`${API_ENDPOINTS.CLUBS}/${id}`, updateData),
  delete: (id) => api.delete(`${API_ENDPOINTS.CLUBS}/${id}`),
}

