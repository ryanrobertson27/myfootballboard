import { Navigate, NavLink, Link, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Logout from "../components/Logout";
import image from "../assets/board-hero-image.png";

const LandingPage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white ">
      <div className="flex w-5/6">
        <div className="flex w-1/2 flex-col justify-center ">
          <div className="flex h-full flex-col justify-between px-5">
            <div className="text-2xl">LOGO</div>
            <div className="mb-4 flex flex-col items-start text-sm font-light italic">
              <div className="mb-2  text-6xl font-extrabold uppercase">
                Friendly Competition for your next big game
              </div>
              <div className="mb-4">
                Create 10x10 games boards to give you and some friends a chance
                to win money based on the outcome of each quarter
              </div>
              <Link
                className=" rounded-md border border-white px-6 py-2 text-white shadow"
                to="/register"
              >
                Create Account
              </Link>
            </div>
            <div>
              <hr className="mb-5 w-5/6 border-gray-500" />
              <div className="text-sm italic text-gray-400">
                <div>
                  Already have an account?
                  <span>
                    <Link className="mx-2 px-4 py-1 text-white" to="/login">
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 justify-center px-5">
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
