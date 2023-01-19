import { accountAPI } from ".";

export type LoginDataType = {
  username: string;
  password: string;
  keepLoggedIn: boolean;
};

export const login = async (loginData: LoginDataType) => {
  const { data } = await accountAPI.post("/login", loginData, {
    withCredentials: true,
  });
  return data;
};
