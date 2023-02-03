import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SettingsSubHeader from '../components/SettingsSubHeader';

const Settings = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <SettingsSubHeader /> <Outlet />
    </>
  );
};

export default Settings;
