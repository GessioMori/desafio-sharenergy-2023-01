import { useMutation } from "react-query";
import { deleteClient } from "../../api/clients/deleteClient";
import { queryClient } from "../../main";

export const useDeleteClient = () =>
  useMutation({
    mutationFn: async (id: string) => deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
    },
  });
