import axios, { AxiosInstance } from "axios";

// Define the base configuration
const config = {
  baseURL: "https://api.schiphol.nl/public-flights", // Replace with your base URL
  headers: {
    resourceversion: "v4",
    app_id: process.env.SCHIPHOL_APPLICATION_ID,
    app_key: process.env.SCHIPHOL_APPLICATION_KEY,
    Accept: "application/json",
  },
};

// Create the instance
const axiosInstance: AxiosInstance = axios.create(config);

export default axiosInstance;
