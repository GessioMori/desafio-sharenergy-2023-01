import { clientAPI } from ".";
import { clientSchema } from "../../validators/schemas/clients/clientSchema";
import { UpdateClientType } from "../../validators/schemas/clients/updateClientSchema";

export const updateClient = async (
  id: string,
  updateClientData: UpdateClientType
) => {
  const { data } = await clientAPI.put(`/${id}`, updateClientData, {
    withCredentials: true,
  });
  const parsedData = clientSchema.parse(data);
  return parsedData;
};
