import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Magic } from "magic-sdk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserLoading } from "./features/user/userSlice";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Callback from "./pages/Callback";
import Board from "./pages/Board";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import NewBoard from "./pages/NewBoard";
import DashboardLayout from "./pages/DashboardLayout";
import PublishedBoard from "./pages/PublishedBoard";

const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY);

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="callback" element={<Callback />} />
      <Route path="published/:boardId" element={<PublishedBoard />} />

      <Route element={<DashboardLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="new-board" element={<NewBoard />} />
          <Route path=":boardId" element={<Board />} />
        </Route>
      </Route>
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();
  const { loading, user, role } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setUserLoading(true));
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => {
          dispatch(setUser(userData));
          dispatch(setUserLoading(false));
        });
      } else {
        dispatch(setUser(null));
        dispatch(setUserLoading(false));
      }
    });
  }, []);

  return <RouterProvider router={route} />;
};

export default App;
