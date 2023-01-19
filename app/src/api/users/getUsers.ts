import { usersAPI } from ".";
import { userResponseSchama } from "../../validators/schemas/users/userSchema";

export const getUsers = async () => {
  const { data } = await usersAPI.get(
    `/?results=200&seed=abcd&inc=name,login,dob,email,picture`
  );
  const parsedData = userResponseSchama.parse(data);
  return parsedData;
};
