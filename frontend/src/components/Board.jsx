import Square from './Square';
import HorizontalNumbers from './HorizontalNumbers';

// TODO should I make board api calls here and pass down as props?

const Board = () => (
  <div className="grid grid-cols-11 grid-rows-11 grid-flow-row gap-1 rounded-lg">
    <div className="col-start-1 col-span-1 row-start-2 row-span-10 ">
      <div className="grid grid-cols-1 grid-rows-10 gap-1">
        <HorizontalNumbers />
      </div>
    </div>
    <div className="col-start-2 col-span-10 row-start-1 row-span-1 ">
      <div className="grid grid-cols-10 grid-rows-1 gap-1">
        <HorizontalNumbers />
      </div>
    </div>
    <div className="col-start-2 col-span-10 row-start-2 row-span-10">
      <div className="grid grid-rows-10 grid-cols-10 gap-1  p-1">
        <Square />
      </div>
    </div>
  </div>
);

export default Board;
