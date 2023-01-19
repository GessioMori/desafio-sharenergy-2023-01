import { useQuery } from "react-query";
import { getClients } from "../../api/clients";

export const useClients = () =>
  useQuery({
    queryKey: ["clients"],
    queryFn: async () => getClients(),
  });
