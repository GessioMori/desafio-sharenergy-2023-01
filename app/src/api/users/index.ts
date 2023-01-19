import axios from "axios";

export const usersAPI = axios.create({
  baseURL: "https://randomuser.me/api/",
});
