import { useGetBoardsByUserEmailQuery } from "../app/services/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BoardSnippet from "./BoardSnippet";
import { Link } from "react-router-dom";

const CurrentBoardsSection = () => {
  const { user } = useSelector((state) => state.user);
  const {
    data: boards,
    isLoading,
    isError,
  } = useGetBoardsByUserEmailQuery({ email: user.email });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error Loading Boards</div>;
  }

  if (boards) {
    if (boards.length < 1) {
      return <div>You have no current Boards</div>;
    } else {
      return (
        <div className="flex flex-wrap">
          {boards.map((board) => (
            <BoardSnippet board={board} />
          ))}
        </div>
      );
    }
  }
};
export default CurrentBoardsSection;
