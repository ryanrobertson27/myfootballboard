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
    <div className="flex justify-center">
      <table className=" table-fixed bg-white shadow rounded-md border-separate">
        <thead className="text-white bg-texas-orange">
          <tr className="divide-x">
            <th className="p-2 w-48">Name</th>
            <th className="p-2 w-48">Phone</th>
            <th className="p-2 w-48">Email</th>
            <th className="p-2 w-48">Venmo</th>
            <th className="p-2 w-48">Squares</th>
            <th className="p-2 w-48">Wins</th>
            <th className="p-2 w-48">Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <UserTableRow user={user} />
          ))}
          <tr className="flex justify-center">
            <td colSpan={7}>
              <button
                type="button"
                className="bg-green-500  text-white px-1 rounded mx-1"
              >
                + New User
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
