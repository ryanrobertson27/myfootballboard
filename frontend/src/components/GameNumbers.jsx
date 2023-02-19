import { useState } from 'react';

const GameNumbers = ({ numbers }) =>
  numbers.map((number) => (
    <div className="aspect-square sm:text-2xl md:text-4xl flex justify-center items-center  bg-white font-bold text-gray-800">
      {number}
    </div>
  ));

export default GameNumbers;
