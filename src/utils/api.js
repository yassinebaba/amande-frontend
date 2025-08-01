// src/utils/api.js

import axios from 'axios';

// ✅ Point d’entrée unique de l’API, configurable via .env
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Routes API
export const createReservation = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/reservations`, data);
  return response.data;
};

export const getAvailableTimeSlots = async (date) => {
  const response = await axios.get(`${API_BASE_URL}/api/reservations/availability`, {
    params: { date: date.toISOString() },
  });
  return response.data;
};

export const getReservations = async (filters = {}) => {
  const response = await axios.get(`${API_BASE_URL}/api/reservations`, {
    params: filters,
  });
  return response.data;
};

export const loginAdmin = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/api/admin/login`, credentials);
  return response.data;
};
