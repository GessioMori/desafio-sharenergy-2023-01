import { clientAPI } from ".";
import { clientSchema } from "../../validators/schemas/clients/clientSchema";
import { CreateClientType } from "../../validators/schemas/clients/createClientShema";

export const createClient = async (createClientData: CreateClientType) => {
  const { data } = await clientAPI.post("/", createClientData, {
    withCredentials: true,
  });
  const parsedNewClient = clientSchema.parse(data);
  return parsedNewClient;
};
