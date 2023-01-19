import { AxiosError } from "axios";
import { UserPlus } from "phosphor-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateClient } from "../hooks/clients/useCreateClient";
import {
  createClientSchema,
  CreateClientType,
} from "../validators/schemas/clients/createClientShema";
import { zodResolver } from "../validators/zod";
import { InputError } from "./InputError";
import { TextInput } from "./TextInput";

export const CreateClient: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isLoading } = useCreateClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CreateClientType>({
    resolver: zodResolver(createClientSchema),
  });

  const onSubmit: SubmitHandler<CreateClientType> = async (createClientData) =>
    mutateAsync(createClientData)
      .then(() => {
        setIsOpen(false);
        reset();
      })
      .catch((error) => {
        if (
          error instanceof AxiosError &&
          error.response?.data.message === "CPF already registered."
        ) {
          setError("cpf", {
            type: "manual",
            message: "CPF already registered",
          });
        } else if (
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

  if (!isOpen) {
    return (
      <div className="w-full max-w-3xl flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-cyan-700 hover:bg-cyan-600 text-white rounded-md px-4 py-2 flex items-center gap-2"
        >
          <UserPlus weight="bold" size={16} />
          New client
        </button>
      </div>
    );
  } else {
    return (
      <div className="bg-zinc-900 p-4 rounded-md w-full max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <TextInput
            label="Name"
            placeholder="Name"
            register={register("name", { required: true })}
          />
          {errors.name?.message && <InputError error={errors.name.message} />}
          <TextInput
            label="CPF"
            placeholder="CPF"
            register={register("cpf", { required: true })}
          />
          {errors.cpf?.message && <InputError error={errors.cpf.message} />}
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
              value={isLoading ? "Creating..." : "Create"}
              disabled={isLoading}
              className="bg-cyan-700 hover:bg-cyan-600 font-bold rounded-md py-2 px-4 my-2 hover:cursor-pointer"
            />
            <input
              type="button"
              value={"Cancel"}
              onClick={() => setIsOpen(false)}
              className="bg-red-800 hover:bg-red-600 font-bold rounded-md py-2 px-4 my-2 hover:cursor-pointer"
            />
          </div>
        </form>
      </div>
    );
  }
};
