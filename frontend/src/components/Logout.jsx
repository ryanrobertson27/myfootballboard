import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await fetch('http://localhost:8000/user/logout', {
      method: 'POST',
    });
    if (res.status === 200) {
      dispatch(setUser(null));
    }
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
