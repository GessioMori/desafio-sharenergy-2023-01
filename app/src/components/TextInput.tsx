import { UseFormRegisterReturn } from "react-hook-form";

type TextInputProps = {
  placeholder: string;
  register: UseFormRegisterReturn;
  label?: string;
  customClass?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  register,
  label,
  customClass,
}: TextInputProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={label} className="font-light text-sm mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        id={label}
        placeholder={placeholder}
        className={customClass || "bg-zinc-800 py-2 px-4 rounded-md"}
        {...register}
      />
    </div>
  );
};
