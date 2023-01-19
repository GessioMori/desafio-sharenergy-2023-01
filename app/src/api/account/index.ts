import axios from "axios";

export const accountAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/account",
});

export { createAccount } from "./createAccount";
export { getAuth } from "./getAuth";
export { login } from "./login";
export { logout } from "./logout";
export type { LoginDataType } from "./login";
