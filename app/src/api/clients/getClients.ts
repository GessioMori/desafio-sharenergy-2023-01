import { clientAPI } from ".";
import { getClientsSchema } from "../../validators/schemas/clients/clientSchema";

export const getClients = async () => {
  const { data } = await clientAPI.get("/", { withCredentials: true });
  const parsedData = getClientsSchema.parse(data);
  return parsedData;
};
