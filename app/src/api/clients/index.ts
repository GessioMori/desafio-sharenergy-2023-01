import axios from "axios";

export const clientAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/client",
});

export { getClients } from "./getClients";
