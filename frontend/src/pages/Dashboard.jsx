import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardSnippet from '../components/BoardSnippet';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="m-5">
        <div className="text-xl font-semibold">Dashboard</div>
      </div>
      <div className="bg-white p-4 w-96 rounded m-5 shadow flex flex-col items-center">
        <span className="mb-4">Boards You Own:</span>
        <BoardSnippet />
        <Link
          to="/new-board"
          className="bg-green-400 text-white px-6 mt-4 rounded drop-shadow-sm"
        >
          New Board
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
