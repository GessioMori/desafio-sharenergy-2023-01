import { AxiosError } from "axios";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDeleteClient } from "../hooks/clients/useDeleteClient";
import { useUpdateClient } from "../hooks/clients/useUpdateClient";
import type { ClientType } from "../validators/schemas/clients/clientSchema";
import {
  updateClientSchema,
  UpdateClientType,
} from "../validators/schemas/clients/updateClientSchema";
import { zodResolver } from "../validators/zod";
import { InputError } from "./InputError";
import { TextInput } from "./TextInput";

type ClientData = {
  clientData: ClientType;
};

export const Client: React.FC<ClientData> = ({ clientData }) => {
  const { name, email, cpf, address, phoneNumber, _id } = clientData;
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading: isLoadingDelete, mutate: mutateDelete } =
    useDeleteClient();
  const { isLoading: isLoadingUpdate, mutateAsync: mutateUpdate } =
    useUpdateClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<UpdateClientType>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      address,
      email,
      name,
      phoneNumber,
    },
  });

  const handleDelete = (id: string) => {
    mutateDelete(id);
  };

  const onSubmit: SubmitHandler<UpdateClientType> = async (
    updateClientData
  ) => {
    mutateUpdate({ updateClientData, id: _id })
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        if (
          error instanceof AxiosError &&
          error.response?.data.message === "E-mail already registered."
        ) {
          setError("email", {
            type: "manual",
            message: "Email already registered",
          });
        } else {
          setError("phoneNumber", {
            type: "manual",
            message: "Some error happened, try again later",
          });
        }
      });
  };

  return (
    <div className="bg-zinc-900 rounded-md p-4 flex justify-between w-full max-w-3xl">
      {isConfirmingDelete ? (
        <div className="flex flex-col w-full">
          <div className="font-bold text-center">
            <span>{`Delete ${name} (CPF: ${cpf})?`}</span>
          </div>
          <div className="flex gap-2 items-center justify-center mt-2">
            <button
              className="bg-red-800 hover:bg-red-600 text-white rounded-md p-2 font-bold"
              onClick={() => handleDelete(_id)}
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? "Deleting..." : "YES"}
            </button>
            <button
              className="bg-cyan-700 hover:bg-cyan-600 text-white rounded-md p-2 font-bold"
              onClick={() => setIsConfirmingDelete(false)}
            >
              NO
            </button>
          </div>
        </div>
      ) : isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <TextInput
            label="Name"
            placeholder="Name"
            register={register("name", { required: true })}
          />
          {errors.name?.message && <InputError error={errors.name.message} />}

          <TextInput
            label="Email"
            placeholder="Email"
            register={register("email", { required: true })}
          />
          {errors.email?.message && <InputError error={errors.email.message} />}
          <TextInput
            label="Address"
            placeholder="Address"
            register={register("address")}
          />
          {errors.address?.message && (
            <InputError error={errors.address.message} />
          )}
          <TextInput
            label="Phone number"
            placeholder="Phone number"
            register={register("phoneNumber")}
          />
          {errors.phoneNumber?.message && (
            <InputError error={errors.phoneNumber.message} />
          )}
          <div className="flex gap-2 justify-end">
            <input
              type="submit"
              value={isLoadingUpdate ? "Updating..." : "Update"}
              disabled={isLoadingUpdate}
              className="bg-cyan-700 hover:bg-cyan-600 font-bold rounded-md py-2 px-4 my-2 hover:cursor-pointer"
            />
            <input
              type="button"
              value={"Cancel"}
              onClick={() => setIsEditing(false)}
              className="bg-red-800 hover:bg-red-600 font-bold rounded-md py-2 px-4 my-2 hover:cursor-pointer"
            />
          </div>
        </form>
      ) : (
        <>
          <div>
            <p>
              <span className="font-bold">Name: </span>
              {name}
            </p>
            <p>
              <span className="font-bold">Email: </span>
              {email}
            </p>
            <p>
              <span className="font-bold">CPF: </span>
              {cpf}
            </p>
            <p>
              <span className="font-bold">Address: </span>
              {address || "-"}
            </p>
            <p>
              <span className="font-bold">Phone number: </span>
              {phoneNumber || "-"}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="bg-cyan-700 hover:bg-cyan-600 text-white rounded-md p-2"
              onClick={() => setIsEditing(true)}
            >
              <PencilSimple weight="bold" size={24} />
            </button>
            <button
              className="bg-red-800 hover:bg-red-600 text-white rounded-md p-2"
              onClick={() => setIsConfirmingDelete(true)}
            >
              <TrashSimple weight="bold" size={24} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
