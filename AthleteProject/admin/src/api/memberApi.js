import api from './axiosInstance'
import { API_ENDPOINTS } from './endpoints'

export const memberApi = {
  getAll: () => api.get(API_ENDPOINTS.MEMBERS),
  getById: (id) => api.get(`${API_ENDPOINTS.MEMBERS}/${id}`),
  create: (memberData) => api.post(API_ENDPOINTS.MEMBERS, memberData),
  update: (id, updateData) => api.put(`${API_ENDPOINTS.MEMBERS}/${id}`, updateData),
  delete: (id) => api.delete(`${API_ENDPOINTS.MEMBERS}/${id}`),
}

