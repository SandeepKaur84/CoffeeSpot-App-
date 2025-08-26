import axios from "axios";

const BASE_URL = 'https://training-trace.vercel.app';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default api;
