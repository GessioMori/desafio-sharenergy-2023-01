import { accountAPI } from ".";

export const logout = async () => {
  await accountAPI.get("/logout", { withCredentials: true });
};
