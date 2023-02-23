import { Link } from "react-router-dom";
import GlobalSpinner from "../components/GlobalSpinner";

const LoadingPage = () => {
  let temp;

  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-5">
        Loading...
        <GlobalSpinner />
      </div>
      <div className="italic text-gray-400">
        Having Trouble? Go to <Link to="/">HOME</Link>
      </div>
    </div>
  );
};

export default LoadingPage;
