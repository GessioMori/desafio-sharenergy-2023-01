import { clientAPI } from ".";
import { clientSchema } from "../../validators/schemas/clients/clientSchema";
import { UpdateClientType } from "../../validators/schemas/clients/updateClientSchema";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateClient = async (
  id: string,
  updateClientData: UpdateClientType
) => {
  await sleep(2000);
  const { data } = await clientAPI.put(`/${id}`, updateClientData, {
    withCredentials: true,
  });
  const parsedData = clientSchema.parse(data);
  return parsedData;
};
