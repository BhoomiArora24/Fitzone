const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const trainerApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/trainers`)
    if (!response.ok) {
      throw new Error(`Failed to fetch trainers: ${response.statusText}`)
    }
    return response.json()
  },
}

