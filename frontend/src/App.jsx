import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Magic } from 'magic-sdk';
import { useEffect } from 'react';
import { setUser } from './features/user/userSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import './index.css';
import Callback from './pages/Callback';

const magic = new Magic('pk_live_C10893DD838C3541');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/callback" element={<Callback />} />
    </Route>
  )
);

const App = () => {
  useEffect(() => {
    setUser({ loading: true });
    magic.user
      .isLoggedIn()
      .then((isLoggedIn) =>
        isLoggedIn
          ? magic.user.getMetadata().then((userData) => setUser(userData))
          : setUser({ user: null })
      );
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
