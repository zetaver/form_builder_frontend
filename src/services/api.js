import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  const response = await axios.post("http://localhost:5000/api/admin/login", { email, password });
  return response.data;
};