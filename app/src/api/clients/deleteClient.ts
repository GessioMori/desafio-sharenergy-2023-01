import { clientAPI } from ".";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const deleteClient = async (id: string) => {
  await sleep(2000);
  await clientAPI.delete(`/${id}`, { withCredentials: true });
};
