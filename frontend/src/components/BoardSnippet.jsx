const BoardSnippet = () => {
  let temp;

  return (
    <div className="w-80 border shadow-sm bg-white rounded flex flex-col items-center">
      <div className="bg-gray-100 w-full text-center py-2 mb-2">Board Name</div>
      <div className="flex justify-around w-full">
        <div>Home</div>
        <div>Away</div>
      </div>
      <div className="flex justify-around w-full mb-2">
        <div>cost/sq: $100</div>
        <div>Sq owned: 30/100</div>
      </div>
    </div>
  );
};

export default BoardSnippet;
