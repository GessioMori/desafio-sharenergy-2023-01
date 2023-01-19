import { UserType } from "../validators/schemas/users/userSchema";

type UserProps = {
  userData: UserType;
};

export const User: React.FC<UserProps> = ({ userData }) => {
  const { dob, email, login, name, picture } = userData;
  return (
    <div className="bg-zinc-900 p-4 rounded-md m-2 flex flex-col md:flex-row gap-2 md:gap-6 items-center max-w-2xl w-full">
      <img src={picture.medium} alt={name.first} className="rounded-sm" />
      <div>
        <p>
          <span className="font-bold">Name: </span> {name.first} {name.last}
        </p>
        <p>
          <span className="font-bold">Username: </span> {login.username}
        </p>
        <p>
          <span className="font-bold">Age: </span> {dob.age} years
        </p>
        <p>
          <span className="font-bold">Email: </span> {email}{" "}
        </p>
      </div>
    </div>
  );
};
