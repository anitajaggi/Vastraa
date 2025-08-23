import axios from "axios";

const api = "http://localhost:8080/api";

const axiosApi = axios.create({
  baseURL: api,
  withCredentials: true,
});

export default axiosApi;
