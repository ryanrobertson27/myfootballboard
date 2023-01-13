import { useState, useContext } from 'react';
import { Magic } from 'magic-sdk';
import { redirect } from 'react-router-dom';
import { setUser } from '../features/user/userSlice';
import LoginForm from '../components/LoginForm';

const magic = new Magic('pk_live_C10893DD838C3541');

const Login = () => {
  const [disabled, setDisabled] = useState(false);

  const handleLogin = async (email) => {
    try {
      setDisabled(true);

      const didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/callback', window.location.origin).href,
      });

      console.log(didToken);

      const res = await fetch('http://localhost:8000/user/login', {
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer${didToken}`,
        }),
        method: 'POST',
      });
      console.log(res);
      if (res.status === 200) {
        const userMetadata = await magic.user.getMetadata();
        setUser(userMetadata);
        redirect('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <LoginForm handleLogin={handleLogin} disabled={disabled} />
    </div>
  );
};

export default Login;
