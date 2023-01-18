import { useState } from 'react';

const HorizontalNumbers = () => {
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return numbers.map((number) => (
    <div className="w-full aspect-square text-center text-3xl flex justify-center items-center rounded-lg bg-white">
      {number}
    </div>
  ));
};

export default HorizontalNumbers;
