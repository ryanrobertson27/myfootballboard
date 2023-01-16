import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const Header = () => {
  const user = useSelector((state) => state.user.user);

  let userLoggedIn;

  if (!user) {
    userLoggedIn = <Link to="/login">Login</Link>;
  } else {
    userLoggedIn = (
      <div className="flex">
        <div className="px-2">{user.email}</div>
        <Logout />
      </div>
    );
  }

  return (
    <div className="w-screen h-20 flex justify-center items-center bg-slate-600 text-white mb-5">
      <div className="flex container justify-between">
        <div>HOME</div>
        <div className="flex justify-end">
          <div className="mr-3">{userLoggedIn}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
