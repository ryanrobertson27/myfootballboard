import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/main-logo-landscape.svg";

const Header = () => {
  return (
    <div className="absolute top-0 flex h-20 w-screen items-center justify-center border-b bg-white">
      <div className="container flex w-full items-center justify-between">
        <div className="ml-5">
          <Logo className="h-auto w-32" />
        </div>
        <div className="mr-5 flex items-center">
          <div className="mx-2 px-2 py-1 ">About</div>
          <div className="mx-2 px-2 py-1 ">Contact</div>
          <Link
            className="font-semi mx-2 rounded px-2 py-1 text-violet-600 hover:underline"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
