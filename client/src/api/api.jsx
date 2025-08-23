import axios from "axios";

const api = "https://vastraa-server.onrender.com/api";

const axiosApi = axios.create({
  baseURL: api,
  withCredentials: true,
});

export default axiosApi;
