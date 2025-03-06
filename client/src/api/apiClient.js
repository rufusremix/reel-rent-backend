import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosAuthInstance = axios.create({
  baseURL: AUTH_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivateInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
