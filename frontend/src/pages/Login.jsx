import { useState, useContext } from 'react';
import { Magic } from 'magic-sdk';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../features/user/userSlice';
import Header from '../components/Header';

const magic = new Magic('pk_live_C10893DD838C3541');

const Login = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const checkUserResponse = await fetch(
      'http://localhost:8000/user/check-user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await checkUserResponse.json();

    if (data.userExists) {
      const didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/callback', window.location.origin).href,
      });

      const res = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${didToken}`,
          'Content-Type': 'application/json',
        }),
      });
      console.log(res);
      if (res.status === 200) {
        const userMetadata = await magic.user.getMetadata();
        console.log(userMetadata);
        setUser(userMetadata);
        navigate('/');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <form className="flex m-5 rounded bg-white flex-col w-96 shadow">
      <div className="p-5">
        <div className="text-lg uppercase mb-5">Login</div>
        <div className="mb-5">
          <div>Email</div>
          <input
            type="test"
            className="border border-texas-light-gray rounded w-full px-2 py-1"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center mb-5">
          <button
            type="submit"
            className="bg-texas-orange text-white w-full rounded  py-1 drop-shadow"
          >
            Login
          </button>
        </div>
        <hr className="mb-5" />
        <div className="flex justify-center">
          <div>
            Need an account?{' '}
            <Link to="/register" className="underline text-texas-orange">
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
