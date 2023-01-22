import { useState } from 'react';

const SubHeader = () => {
  const [count, setCount] = useState();

  return (
    <div className="flex w-screen justify-center mb-5 bg-texas-light-white h-10 items-center border-b border-texas-light-gray ">
      <div className="px-2 bg-texas-orange text-texas-white rounded mx-1">
        Board
      </div>
      <div className="px-2 bg-texas-white rounded mx-1">Leaders</div>
      <div className="px-2 bg-texas-white rounded mx-1">Past Weeks</div>
    </div>
  );
};

export default SubHeader;
