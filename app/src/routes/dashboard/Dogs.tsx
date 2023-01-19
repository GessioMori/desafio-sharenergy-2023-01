import { Dog } from "phosphor-react";
import { useState } from "react";

export const Dogs: React.FC = () => {
  const [imageCode, setImageCode] = useState("");

  const getDog = async () => {
    await fetch("https://random.dog/woof").then((res) =>
      res.text().then((data) => setImageCode(data))
    );
  };

  return (
    <div className="flex flex-col items-center p-2">
      <button
        onClick={() => getDog()}
        className="flex items-center gap-2 bg-cyan-700 rounded-md py-2 px-4 my-2 hover:cursor-pointer"
      >
        <Dog weight="bold" />
        Get a new dog
      </button>
      <div className="min-h-small10 min-w-small">
        <img
          className="max-h-96 min-w-small"
          src={`https://random.dog/${imageCode}`}
          alt="Click on the button to get a new dog!"
        />
      </div>
    </div>
  );
};
