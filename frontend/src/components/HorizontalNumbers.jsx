import { useState } from 'react';

const HorizontalNumbers = () => {
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return numbers.map((number) => (
    <div className="aspect-square truncate text-center sm:text-2xl md:text-4xl shadow flex justify-center items-center rounded-sm md:rounded-lg bg-white font-bold text-gray-800">
      {number}
    </div>
  ));
};

export default HorizontalNumbers;
