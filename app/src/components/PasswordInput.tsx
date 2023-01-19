import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";

type PasswordInputProps = {
  register: UseFormRegisterReturn;
  label: string;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  register,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((current) => !current);
  };

  return (
    <div className="relative">
      <label htmlFor={label} className="font-light text-sm mb-1">
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        className="bg-zinc-800 py-2 px-4 rounded-md w-full"
        placeholder="Password (min. 6 characters)"
        id={label}
        {...register}
      />
      {showPassword ? (
        <EyeSlash
          className="absolute right-3 bottom-3 text-lg text-zinc-100 hover:cursor-pointer"
          weight={"bold"}
          onClick={toggleVisibility}
        />
      ) : (
        <Eye
          className="absolute right-3 bottom-3 text-lg text-zinc-100 hover:cursor-pointer"
          weight={"bold"}
          onClick={toggleVisibility}
        />
      )}
    </div>
  );
};
