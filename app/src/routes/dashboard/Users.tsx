import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "../../components/Loader";
import { Pagination } from "../../components/Pagination";
import { TextInput } from "../../components/TextInput";
import { User } from "../../components/User";
import { useUsers } from "../../hooks/users/useUsers";
import { UserType } from "../../validators/schemas/users/userSchema";

export const Users: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUsers();
  const { register, watch } = useForm();

  const itemsPerPage = 10;

  const handlePageClick = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const applyFilters = ({
    value = "",
    usersList,
  }: {
    value: string;
    usersList: UserType[];
  }) => {
    return usersList.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`;
      return (
        fullName.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.login.username.toLowerCase().includes(value.toLowerCase())
      );
    });
  };

  const filteredUsers = useMemo(
    () =>
      applyFilters({
        value: watch("filter"),
        usersList: data?.results || [],
      }),
    [watch("filter"), data]
  );

  useEffect(() => {
    setPage(1);
  }, [filteredUsers]);

  if (data) {
    return (
      <div className="flex flex-col items-center px-2">
        <form>
          <TextInput
            placeholder="Search for an user"
            register={register("filter")}
            customClass="bg-zinc-900 py-2 px-4 rounded-md my-2"
          />
        </form>
        {filteredUsers.length > itemsPerPage && (
          <Pagination
            page={page}
            onChange={handlePageClick}
            count={Math.ceil(filteredUsers.length / itemsPerPage)}
          />
        )}

        {filteredUsers.slice((page - 1) * 10, page * 10).map((user) => (
          <User userData={user} key={user.login.uuid} />
        ))}
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
