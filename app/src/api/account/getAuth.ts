import { accountAPI } from ".";

export const getAuth = async () => {
  const { data } = await accountAPI.get("/", { withCredentials: true });

  return data;
};
