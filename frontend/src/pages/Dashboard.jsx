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
      <div className="my-10 flex flex-col">
        {/* <div className="text-xl font-semibold">Dashboard</div> */}
        <div className="mb-5 text-2xl">Welcome back: {user.email}</div>
        <hr />
      </div>
      <div className="mb-10 flex w-full flex-col items-start ">
        <div className="flex ">
          <div className="mb-4 mr-4 text-2xl font-semibold">Boards</div>
          <Link
            to="/new-board"
            className="h-fit w-fit  rounded border border-green-500 bg-green-500 px-2 text-white hover:bg-white hover:text-green-500"
          >
            New
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
