import { useMutation } from "react-query";
import { createClient } from "../../api/clients/createClient";
import { queryClient } from "../../main";
import { CreateClientType } from "../../validators/schemas/clients/createClientShema";

export const useCreateClient = () =>
  useMutation({
    mutationFn: async (createClientData: CreateClientType) =>
      createClient(createClientData),
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
    },
  });
