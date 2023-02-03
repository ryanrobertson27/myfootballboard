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
    <div className="overflow-y-auto h-48">
      <div className="flex flex-col items-start ml-2">
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
      <div>
        <button
          onClick={() => handleNewUserClick()}
          type="button"
          className="bg-green-400 text-white px-2 ml-2"
        >
          New User
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
