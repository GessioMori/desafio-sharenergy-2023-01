import { Client } from "../../components/Client";
import { CreateClient } from "../../components/CreateClient";
import { Loader } from "../../components/Loader";
import { useClients } from "../../hooks/clients/useClients";

export const Clients: React.FC = () => {
  const { data, isLoading } = useClients();
  if (data) {
    return (
      <div className="flex flex-col items-center gap-2 p-2">
        <CreateClient />
        {data.map((client) => {
          return <Client key={client._id} clientData={client} />;
        })}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-2xl text-center">
      Ops! An error occurred, try again!
    </div>
  );
};
