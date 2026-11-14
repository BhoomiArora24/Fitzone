import api from './axiosInstance'

export const trainerApi = {
  getAll: () => api.get('/trainers'),
  getById: (id) => api.get(`/trainers/${id}`),
}

export default trainerApi
