import axios from "axios";

const api = "https://vastraa-server.onrender.com";
// const api = "http://localhost:8080/api";

const axiosApi = axios.create({
  baseURL: api,
  withCredentials: true,
});

export default axiosApi;
