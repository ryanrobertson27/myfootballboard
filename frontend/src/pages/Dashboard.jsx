import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetUserByEmailQuery } from "../app/services/api";

import CurrentBoardsSection from "../components/CurrentBoardsSection";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  const { data, isLoading, isError } = useGetUserByEmailQuery({
    user: user.email,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="container flex flex-col ">
      <div className="mt-10 mb-5 flex flex-col">
        <div className="mb-6 text-xl">Welcome back: {user.email}</div>
        <hr />
      </div>
      <div className="mb-10 flex w-full flex-col items-start ">
        <div className="mb-4 flex items-center">
          <div className="mr-4 text-2xl font-semibold">Boards</div>
          <Link
            to="/new-board"
            className="mr-2 inline-flex items-center rounded-md border border-gray-300 bg-violet-600 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-white hover:text-violet-600"
          >
            Create New Board
          </Link>
        </div>

        <div className="w-full">
          <CurrentBoardsSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
