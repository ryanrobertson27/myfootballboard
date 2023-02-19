import { useDispatch } from 'react-redux';
import { Magic } from 'magic-sdk';
import { setUser } from '../features/user/userSlice';
import { ReactComponent as LogoutIcon } from '../assets/logout-icon.svg';

const magic = new Magic('pk_live_C10893DD838C3541');

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    magic.user.logout().then(() => {
      dispatch(setUser(null));
    });
  };

  return (
    <div className="flex items-center">
      <LogoutIcon className="w-5 h-5 mr-2" />
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Logout;
