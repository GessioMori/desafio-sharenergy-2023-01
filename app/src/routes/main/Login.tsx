import { AxiosError } from "axios";
import { UserPlus } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../../hooks/account/useLogin";
import { LoginDataType } from "../../api/account/login";
import { InputError } from "../../components/InputError";
import { PasswordInput } from "../../components/PasswordInput";
import { TextInput } from "../../components/TextInput";

export const Login: React.FC = () => {
  const { mutateAsync, data: isLoggedIn, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginDataType>();

  const onSubmit: SubmitHandler<LoginDataType> = async ({
    username,
    password,
    keepLoggedIn,
  }) =>
    mutateAsync({ username, password, keepLoggedIn }).catch((error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setError("password", {
          type: "manual",
          message: "Username and/or password incorrect",
        });
      } else {
        setError("password", {
          type: "manual",
          message: "Some error happened, try again later",
        });
      }
    });

  if (isLoggedIn !== undefined) {
    return <Navigate to={"/dashboard/users"} />;
  }
  return (
    <div className="h-screen p-2 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-md p-4 w-screen max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-3">Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <TextInput
            label="Username"
            placeholder="Username"
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
          <div className="flex gap-2 justify-end font-light">
            <input
              type="checkbox"
              {...register("keepLoggedIn")}
              id="keepLoggedInCheckbox"
            />
            <label htmlFor="keepLoggedInCheckbox">Keep me logged in</label>
          </div>

          <input
            type="submit"
            value={isLoading ? "Loading..." : "Sign in"}
            className="bg-cyan-700 hover:bg-cyan-600 font-extrabold rounded-md py-2 px-4 my-2 hover:cursor-pointer"
          />
        </form>
        <Link to="/signup">
          <UserPlus className="inline mr-2" />
          <span className="underline font-light text-sm">
            Create an account
          </span>
        </Link>
      </div>
    </div>
  );
};
