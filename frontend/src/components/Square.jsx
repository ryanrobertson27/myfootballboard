import { names } from '../data/names';

const Square = () =>
  names.map((name) => (
    <div className="w-full aspect-square border text-center flex justify-center items-center">
      {name}
    </div>
  ));

export default Square;
