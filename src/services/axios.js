import axios from "axios";
import config from "@/config";

const instance = axios.create({
  baseURL: config.BASE_API,
  withCredentials: true,
  timeout: 30000,
  headers: { "Cache-Control": "no-cache" },
});

export default instance;
