import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetBoardsByUserEmailQuery } from "../app/services/users";
import BoardSnippet from "../components/BoardSnippet";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const {
    data: boards,
    isLoading,
    isError,
  } = useGetBoardsByUserEmailQuery(user.email);

  useEffect(() => {
    console.log(boards, isLoading, isError);
  }, [boards, isLoading, isError]);

  let boardsToRender;

  if (isLoading) {
    boardsToRender = <div>Loading...</div>;
  }

  if (isError) {
    boardsToRender = <div>Error</div>;
  }

  if (boards) {
    // boardsToRender = <div>There should be a board here</div>;
    boardsToRender = boards.map((board) => (
      <BoardSnippet key={board._id} board={board} />
    ));
  }

  if (!boards) {
    boardsToRender = <div>You don't have any boards yet</div>;
  }

  return (
    <div className="w-full">
      <div className="m-5 flex flex-col">
        <div className="text-xl font-semibold">Dashboard</div>
        <div>Welcome back: {user.email}</div>
      </div>
      <div className="m-5 flex w-96 flex-col items-center ">
        <span className="mb-4">Your Boards</span>
        <div className="rounded bg-white p-4 shadow">
          <div>{boardsToRender}</div>
          <Link
            to="/new-board"
            className="mt-4 rounded bg-green-400 px-6 text-white drop-shadow-sm"
          >
            New Board
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
