import api from './axiosInstance'
import { API_ENDPOINTS } from './endpoints'

export const trainerApi = {
  getAll: () => api.get(API_ENDPOINTS.TRAINERS),
  getById: (id) => api.get(`${API_ENDPOINTS.TRAINERS}/${id}`),
  create: (trainerData) => api.post(API_ENDPOINTS.TRAINERS, trainerData),
  update: (id, updateData) => api.put(`${API_ENDPOINTS.TRAINERS}/${id}`, updateData),
  delete: (id) => api.delete(`${API_ENDPOINTS.TRAINERS}/${id}`),
}

