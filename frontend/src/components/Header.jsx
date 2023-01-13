import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  let userLoggedIn;

  if (!user) {
    userLoggedIn = <Link to="/login">Login</Link>;
  } else {
    userLoggedIn = <div>{user}</div>;
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
