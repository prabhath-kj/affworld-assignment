import { BASE_URL } from "@/constants";
import axios from "axios"

const instance = axios.create({
    baseURL:BASE_URL
  });

  instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance