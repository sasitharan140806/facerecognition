import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const getAttendance = async () => {
  const response = await axios.get(`${API_URL}/attendance`);
  return response.data;
};

export const markAttendance = async (imageData) => {
  const response = await axios.post(`${API_URL}/attendance/mark`, { image: imageData });
  return response.data;
};

export const getReports = async (startDate, endDate) => {
  const response = await axios.get(`${API_URL}/reports`, {
    params: { startDate, endDate }
  });
  return response.data;
};