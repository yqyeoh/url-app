import axios from "axios";
import config from "@/config";

console.log("config.BASE_API", config.BASE_API);
const instance = axios.create({
  baseURL: config.BASE_API,
  withCredentials: true,
  timeout: 30000,
  headers: { "Cache-Control": "no-cache" },
});

export default instance;
