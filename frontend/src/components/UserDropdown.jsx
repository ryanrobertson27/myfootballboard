import { useState } from "react";
import { useGetUsersQuery } from "../app/services/api";

const UserDropdown = ({
  nameToSearch,
  handleNewUserClick,
  handleUserSelect,
}) => {
  const { data, isLoading, isError } = useGetUsersQuery();

  if (isError) {
    return <div>Error...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const users = data.filter((user) => user?.name.includes(nameToSearch));

  return (
    <div className="mb-4 max-h-48 w-full overflow-y-auto rounded border p-1">
      <div className="ml-2 flex flex-col items-start ">
        {users.map((user) => (
          <button
            type="button"
            className="mb-1 w-full pl-1 text-start hover:bg-gray-100"
            onClick={(e) => handleUserSelect(e)}
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserDropdown;
