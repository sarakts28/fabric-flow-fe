import axios from "axios";

const API = axios.create({
  baseURL: "https://unlacquered-nonanimatingly-agatha.ngrok-free.dev",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
