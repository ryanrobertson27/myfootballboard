import { useDispatch } from 'react-redux';
import { Magic } from 'magic-sdk';
import { setUser } from '../features/user/userSlice';

const magic = new Magic('pk_live_C10893DD838C3541');

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    magic.user.logout().then(() => {
      dispatch(setUser(null));
    });
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
