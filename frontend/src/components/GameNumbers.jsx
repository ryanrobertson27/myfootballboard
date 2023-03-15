import { useEffect, useState } from "react";

const GameNumbers = ({ numbers, team }) => {
  let border;

  if (team === "home") {
    border = "first:border-l";
  } else if (team === "away") {
    border = "first:border-t";
  }

  return numbers.map((number) => (
    <div
      className={` ${border} flex aspect-square items-center justify-center overflow-auto  truncate bg-white  text-xs font-normal  text-gray-800 sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl`}
    >
      {number}
    </div>
  ));
};

export default GameNumbers;
