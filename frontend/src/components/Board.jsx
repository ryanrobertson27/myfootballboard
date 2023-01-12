import Square from './Square';

const Board = () => (
  <div>
    <div className="grid grid-cols-10 grid-rows-10">
      <Square />
    </div>
  </div>
);

export default Board;
