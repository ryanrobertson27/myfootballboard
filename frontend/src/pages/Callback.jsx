import { Magic } from 'magic-sdk';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import GlobalSpinner from '../components/GlobalSpinner';

const magic = new Magic('pk_live_C10893DD838C3541');

const Callback = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    finishEmailRedirectLogin();
  }, [searchParams]);

  const finishEmailRedirectLogin = async () => {
    const magicCredential = new URLSearchParams(searchParams).get(
      'magic_credential'
    );
    if (magicCredential) {
      magic.auth.loginWithCredential().then((didToken) => {
        console.log(didToken);
        authenticateWithServer(didToken);
      });
    }
  };

  const authenticateWithServer = async (didToken) => {
    const res = await fetch('http://localhost:8000/users/login', {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${didToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(res);
    if (res.status === 200) {
      const userMetadata = await magic.user.getMetadata();
      dispatch(setUser(userMetadata));
      navigate('/');
    }
  };
  return (
    <div className="flex flex-col">
      <div>Please wait... redirecting</div>
      <GlobalSpinner size={10} />
    </div>
  );
};

export default Callback;
