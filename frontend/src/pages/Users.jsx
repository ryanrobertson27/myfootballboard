import { useState } from 'react';
import { useGetUsersQuery } from '../app/services/users';
import UserTableRow from '../components/UserTableRow';

const Users = () => {
  const [temp, setTemp] = useState();
  const { data, isLoading, isError } = useGetUsersQuery();

  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <table className=" table-fixed bg-white shadow rounded-md border-separate">
        <thead className="text-white bg-gray-500">
          <tr className="divide-x">
            <th className="p-2 w-48">Name</th>
            <th className="p-2 w-48">Phone</th>
            <th className="p-2 w-48">Email</th>
            <th className="p-2 w-48">Venmo</th>
            <th className="p-2 w-48">Squares</th>
            <th className="p-2 w-48">Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <UserTableRow user={user} />
          ))}
          <tr className="flex justify-center">
            <td colSpan={7} />
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        className="bg-green-500 shadow-md my-4 text-white py-1 px-4 rounded mx-1"
      >
        + New User
      </button>
    </div>
  );
};

export default Users;
