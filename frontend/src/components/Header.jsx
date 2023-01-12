import { useState } from 'react';

const Header = () => {
  const [count, setCount] = useState();

  return (
    <div className="w-screen h-20 flex justify-center items-center bg-slate-600 text-white mb-5">
      <div className="flex container justify-between">
        <div>HOME</div>
        <div className="flex justify-end">
          <div className="mr-3">Hello, Ryan</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
