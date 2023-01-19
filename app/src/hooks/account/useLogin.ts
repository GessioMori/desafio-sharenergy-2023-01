import { useMutation } from "react-query";
import { login, LoginDataType } from "../../api/account";

export const useLogin = () =>
  useMutation({
    mutationFn: (loginData: LoginDataType) => login(loginData),
    mutationKey: ["login"],
  });
