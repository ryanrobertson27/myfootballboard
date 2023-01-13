import { Magic } from 'magic-sdk';
import { useEffect } from 'react';
import { redirect, useSearchParams } from 'react-router-dom';
import { setUser } from '../features/user/userSlice';

const magic = new Magic('pk_live_C10893DD838C3541');

const Callback = (props) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    finishEmailRedirectLogin();
  }, [searchParams]);

  const finishEmailRedirectLogin = async () => {
    const magicCredential = new URLSearchParams(searchParams).get(
      'magic_credential'
    );
    if (magicCredential) {
      magic.auth
        .loginWithCredential()
        .then((didToken) => authenticateWithServer(didToken));
    }
  };

  const authenticateWithServer = async (didToken) => {
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
      redirect('http://localhost:8000');
    }
  };
  return <div>Loading</div>;
};

export default Callback;
