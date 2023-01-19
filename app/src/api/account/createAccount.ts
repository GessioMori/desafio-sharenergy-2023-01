import { accountAPI } from ".";
import { CreateAccountDataType } from "../../validators/schemas/account/createAccountSchema";

export const createAccount = async (
  createAccountData: CreateAccountDataType
) => {
  const { data } = await accountAPI.post("/signup", {
    username: createAccountData.username,
    password: createAccountData.password,
  });
  return data;
};
