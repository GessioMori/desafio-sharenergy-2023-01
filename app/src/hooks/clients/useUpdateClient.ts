import { useMutation } from "react-query";
import { updateClient } from "../../api/clients/updateClient";
import { queryClient } from "../../main";
import { UpdateClientType } from "../../validators/schemas/clients/updateClientSchema";

export const useUpdateClient = () =>
  useMutation({
    mutationFn: async ({
      id,
      updateClientData,
    }: {
      id: string;
      updateClientData: UpdateClientType;
    }) => updateClient(id, updateClientData),
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
    },
  });
