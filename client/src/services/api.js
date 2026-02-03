import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:5000/api",
});

export const fetchStock = (symbol) =>
  API.get(`/stock/${symbol}`);
