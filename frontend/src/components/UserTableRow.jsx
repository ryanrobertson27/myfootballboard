import { useState } from "react";
import { useGetUsersQuery } from "../app/services/users";

const UserTableRow = ({ user }) => {
  const [temp, setTemp] = useState();

  return (
    <tr className="odd:bg-gray-50 even:bg-white">
      <td className="p-2">{user?.name || "n/a"}</td>
      <td className="p-2">{user?.phone || "n/a"}</td>
      <td className="p-2">{user?.email || "n/a"}</td>
      <td className="p-2">{user?.venmo || "n/a"}</td>
      <td className="p-2">test</td>
      <td className="flex justify-center p-2">
        <button type="button" className="object-fill">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
          </svg>
        </button>
        <button
          type="button"
          className="mx-1 rounded bg-red-600 px-2 text-white"
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;
