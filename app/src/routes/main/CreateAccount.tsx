import { AxiosError } from "axios";
import { SignIn } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAccount } from "../../hooks/account/useAccount";

import { InputError } from "../../components/InputError";
import { PasswordInput } from "../../components/PasswordInput";
import { TextInput } from "../../components/TextInput";
import { zodResolver } from "../../validators/zod";
import {
  CreateAccountDataType,
  createAccountSchema,
} from "../../validators/schemas/account/createAccountSchema";

export const CreateAccount: React.FC = () => {
  const { mutateAsync, data, isLoading } = useAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateAccountDataType>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit: SubmitHandler<CreateAccountDataType> = async (
    createAccountData
  ) =>
    mutateAsync(createAccountData).catch((error) => {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setError("username", {
          type: "manual",
          message: "Username already registered",
        });
      } else {
        setError("password", {
          type: "manual",
          message: "Some error happened, try again later",
        });
      }
    });

  if (data) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="h-screen p-2 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-md p-4 w-screen max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-3">
          Create an account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <TextInput
            label="Username"
            placeholder="Username (min. 5 characters)"
            register={register("username", { required: true })}
          />
          {errors.username?.message && (
            <InputError error={errors.username.message} />
          )}
          <PasswordInput
            label="Password"
            register={register("password", { required: true })}
          />
          {errors.password?.message && (
            <InputError error={errors.password.message} />
          )}
          <PasswordInput
            label="Confirm password"
            register={register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword?.message && (
            <InputError error={errors.confirmPassword.message} />
          )}
          <input
            type="submit"
            value={isLoading ? "Loading..." : "Sign up"}
            className="bg-cyan-700 hover:bg-cyan-600 font-extrabold rounded-md py-2 px-4 my-2 hover:cursor-pointer"
          />
        </form>
        <Link to="/">
          <SignIn className="inline mr-2" />
          <span className="underline font-light text-sm">
            Go to sign in instead
          </span>
        </Link>
      </div>
    </div>
  );
};
