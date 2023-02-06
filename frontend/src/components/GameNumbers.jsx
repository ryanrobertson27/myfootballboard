import { useState } from 'react';

const GameNumbers = ({ numbers }) =>
  numbers.map((number) => (
    <div className="aspect-square truncate text-center sm:text-2xl md:text-4xl shadow flex justify-center items-center rounded-sm md:rounded-lg bg-white font-bold text-gray-800">
      {number}
    </div>
  ));

export default GameNumbers;
