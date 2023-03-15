import { Navigate, NavLink, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import image from "../assets/board-hero-image.png";
import logo from "../assets/footballsquareslogo.png";

const LandingPage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  if (user) {
    // TODO look into history
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-t from-slate-50 via-slate-100 to-slate-50 ">
      {/* Header  */}
      <div className="absolute top-0 flex h-20 w-screen items-center justify-center border-b">
        <div className="container flex w-full items-center justify-between">
          <div className="ml-5">
            <img className="h-12 w-auto" src={logo} />
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
      <div className="container flex items-center">
        <div className="flex h-full basis-1/2 flex-col px-12">
          <div className="mb-4 text-6xl font-semibold  leading-snug text-violet-900">
            Friendly Competition For Your Next Big Game
          </div>
          <div className="mb-8 italic">
            Create 10x10 games boards to give you and some friends a chance to
            win money based on the outcome of each quarter
          </div>
          <Link
            className=" w-fit rounded-md border border-violet-500 bg-violet-500 px-6 py-2 text-white shadow hover:bg-slate-50 hover:text-violet-500 "
            to="/register"
          >
            Create Account
          </Link>
        </div>
        <div className="flex basis-1/2 justify-center px-12">
          <img
            className="w-auto rounded-lg shadow-2xl "
            src={image}
            alt="placeholder"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
