import { useState } from "react";

const GameNumbers = ({ numbers }) =>
  numbers.map((number) => (
    <div className="flex aspect-square items-center justify-center bg-white font-bold  text-gray-800 sm:text-2xl md:text-4xl">
      {number}
    </div>
  ));

export default GameNumbers;
