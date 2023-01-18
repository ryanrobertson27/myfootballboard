import { names } from '../data/names';

const Square = () =>
  names.map((name) => (
    <div className="w-full aspect-square text-center flex justify-center items-center rounded-lg bg-white">
      {name}
    </div>
  ));

export default Square;
