import { useMutation } from "react-query";
import { createAccount } from "../../api/account";
import { CreateAccountDataType } from "../../validators/schemas/account/createAccountSchema";

export const useAccount = () =>
  useMutation({
    mutationFn: (createAccountData: CreateAccountDataType) =>
      createAccount(createAccountData),
    mutationKey: ["createAccount"],
  });
