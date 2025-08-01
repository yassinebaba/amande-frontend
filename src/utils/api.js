import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ✅ Envoie une nouvelle réservation
export const createReservation = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/book`, data);
  return response.data;
};

// ✅ Récupère les esthéticiennes déjà occupées à une date
export const getAvailableTimeSlots = async (date) => {
  const response = await axios.get(`${API_BASE_URL}/bookings`, {
    params: { date: date.toISOString().split("T")[0] }
  });
  return response.data;
};

// ✅ Récupère toutes les réservations avec filtres
export const getReservations = async (filters = {}) => {
  const response = await axios.get(`${API_BASE_URL}/book`, {
    params: filters
  });
  return response.data;
};

// ✅ Connexion admin
export const loginAdmin = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
  return response.data;
};

// ✅ Changement de statut (admin)
export const updateReservationStatus = async (id, status) => {
  const response = await axios.patch(`${API_BASE_URL}/book/${id}`, { statut: status });
  return response.data;
};
