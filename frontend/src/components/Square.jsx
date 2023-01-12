import { names } from '../data/names';

const Square = () =>
  names.map((name) => <div className="w-10 h-10 border">{name}</div>);

export default Square;
