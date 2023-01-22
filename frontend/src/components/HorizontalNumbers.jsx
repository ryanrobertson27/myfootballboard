import { useState } from 'react';

const HorizontalNumbers = () => {
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return numbers.map((number) => (
    <div className="w-20 aspect-square text-center text-4xl shadow flex justify-center items-center rounded-lg bg-texas-white font-bold text-texas-orange">
      {number}
    </div>
  ));
};

export default HorizontalNumbers;
