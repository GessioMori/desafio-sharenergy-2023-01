import axios from "axios";

export const clientAPI = axios.create({
  baseURL: "http://localhost:3333/client",
});

export { getClients } from "./getClients";
