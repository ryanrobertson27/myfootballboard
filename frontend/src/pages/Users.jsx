import { useState } from "react";
import { useGetUsersQuery } from "../app/services/api";
import UserTableRow from "../components/UserTableRow";

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
      <table className=" table-fixed border-separate rounded-md bg-white shadow">
        <thead className="bg-gray-500 text-white">
          <tr className="divide-x">
            <th className="w-48 p-2">Name</th>
            <th className="w-48 p-2">Phone</th>
            <th className="w-48 p-2">Email</th>
            <th className="w-48 p-2">Venmo</th>
            <th className="w-48 p-2">Squares</th>
            <th className="w-48 p-2">Operations</th>
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
        className="my-4 mx-1 rounded bg-green-500 py-1 px-4 text-white shadow-md"
      >
        + New User
      </button>
    </div>
  );
};

export default Users;
