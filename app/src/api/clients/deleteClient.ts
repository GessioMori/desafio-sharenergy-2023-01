import { clientAPI } from ".";

export const deleteClient = async (id: string) => {
  await clientAPI.delete(`/${id}`, { withCredentials: true });
};
