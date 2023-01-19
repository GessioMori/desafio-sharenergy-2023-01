import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/TextInput";

type CatInput = {
  httpCode: string;
};

export const Cats: React.FC = () => {
  const { register, handleSubmit } = useForm<CatInput>();
  const [httpCode, setHttpCode] = useState("");

  const onSubmit = (data: CatInput) => {
    setHttpCode(data.httpCode);
  };

  return (
    <div className="flex flex-col items-center p-2">
      <form className="flex gap-3" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="HTTP Code"
          register={register("httpCode")}
          customClass="bg-zinc-900 py-2 px-4 rounded-md my-2 max-w-[200px]"
        />
        <input
          type="submit"
          value="Search"
          className="bg-cyan-700 font-extrabold rounded-md py-2 px-4 my-2 hover:cursor-pointer"
        />
      </form>
      <img
        className="max-lg:h-full"
        src={`https://http.cat/${httpCode}.jpg`}
        alt={`${httpCode} cat`}
      />
    </div>
  );
};
