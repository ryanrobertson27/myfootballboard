import { useState, useContext } from 'react';
import { Magic } from 'magic-sdk';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/user/userSlice';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

const magic = new Magic('pk_live_C10893DD838C3541');

const Login = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const handleLogin = async (email) => {
    try {
      setDisabled(true);

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
        navigate('http://localhost:8000');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex h-screen justify-center items-center">
        <LoginForm handleLogin={handleLogin} disabled={disabled} />
      </div>
    </>
  );
};

export default Login;
