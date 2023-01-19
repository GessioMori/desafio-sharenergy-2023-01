import { useQuery } from "react-query";
import { getUsers } from "../../api/users/getUsers";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
