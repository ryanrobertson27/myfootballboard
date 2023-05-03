import { Navigate, NavLink, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import image from "../assets/myfootballboard-hero-image.png";
import Header from "../components/Header";

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
      <Header />
      <div className="container flex items-center">
        <div className="mr-5 flex h-full basis-1/2 flex-col px-3 text-xs">
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

        <div className="ml-5 flex basis-1/2 justify-center px-3">
          <img
            className=" w-auto rounded-lg shadow-2xl "
            src={image}
            alt="placeholder"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
