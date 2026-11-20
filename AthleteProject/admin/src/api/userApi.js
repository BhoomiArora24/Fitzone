import api from './axiosInstance'
import { API_ENDPOINTS } from './endpoints'

export const userApi = {
  getAll: (params) => api.get(API_ENDPOINTS.USERS, { params }),
  getById: (id) => api.get(`${API_ENDPOINTS.USERS}/${id}`),
  update: (id, userData) => api.put(`${API_ENDPOINTS.USERS}/${id}`, userData),
  updateStatus: (id, statusData) => api.patch(`${API_ENDPOINTS.USERS}/${id}/status`, statusData),
  delete: (id) => api.delete(`${API_ENDPOINTS.USERS}/${id}`),
}

export default userApi

