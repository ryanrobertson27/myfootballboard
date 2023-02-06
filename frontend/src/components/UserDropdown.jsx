import { useState } from 'react';
import { useGetUsersQuery } from '../app/services/users';

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
    <div className="overflow-y-auto max-h-48 w-full rounded shadow-inner mb-4">
      <div className="flex flex-col items-start ml-2 divide-y divide-gray-100">
        {users.map((user) => (
          <button
            type="button"
            className="mb-1 hover:bg-gray-100 w-full text-start pl-1"
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
