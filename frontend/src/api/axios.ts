import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

export const pickList = <T = any>(data: any): T[] => {
  if (data && Array.isArray(data)) return data as T[];
  if (data && Array.isArray(data.items)) return data.items as T[];
  if (
    data &&
    data.items &&
    typeof data.items === "object" &&
    "docs" in data.items
  )
    return (data.items.docs as T[]) || [];
  return [];
};
