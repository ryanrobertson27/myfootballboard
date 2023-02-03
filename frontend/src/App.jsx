import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Magic } from 'magic-sdk';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserLoading } from './features/user/userSlice';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Callback from './pages/Callback';
import Board from './pages/Board';
import Leaderboard from './pages/Leaderboard';
import History from './pages/History';
import Users from './pages/Users';

const magic = new Magic('pk_live_C10893DD838C3541');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<Board />} />
      <Route path="leaderboard" element={<Leaderboard />} />
      <Route path="history" element={<History />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="settings" element={<Settings />}>
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="callback" element={<Callback />} />
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setUserLoading(true));
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => {
          dispatch(setUser(userData));
        });
      } else {
        dispatch(setUser(null));
        dispatch(setUserLoading(false));
      }
    });
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
