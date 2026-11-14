import api from './axiosInstance'

export const clubApi = {
  getAll: () => api.get('/clubs'),
  getById: (id) => api.get(`/clubs/${id}`),
}

export default clubApi

