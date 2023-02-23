import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Board from "../components/GameBoard";
import GameScore from "../components/GameScore";
import Header from "../components/Header";
import LandingPage from "./LandingPage";
import Leaderboard from "./Leaderboard";
import LoadingPage from "./LoadingPage";
import Dashboard from "./Dashboard";
import DashboardLayout from "./DashboardLayout";

const Home = () => {
  const { user, loading } = useSelector((state) => state.user);

  // renders loading page while user is being fetched
  if (loading) {
    return <LoadingPage />;
  }

  return <Outlet />;
};

export default Home;
