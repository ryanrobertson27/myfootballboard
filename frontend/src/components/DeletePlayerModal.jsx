import { useDeleteBoardPlayerByIdMutation } from "../app/services/api";

const DeletePlayerModal = ({ setIsConfirmShowing, player }) => {
  const [deletePlayer, result] = useDeleteBoardPlayerByIdMutation();

  const handleDeleteClick = () => {
    deletePlayer(player._id);
    setIsConfirmShowing(false);
  };

  return (
    <div className="fixed top-0 left-0 z-10 flex h-screen  w-screen items-center justify-center bg-black/[.5]">
      <div className=" z-20 flex max-w-lg flex-col items-center rounded bg-white p-5 shadow">
        <div className="mb-4 text-center text-xl">
          Are you sure you want to delete this player?
        </div>
        <div className="mb-4 text-center text-base">
          This will delete the player and make squares they own available again.
          This cannot be undone
        </div>
        <div className="flex w-full justify-around">
          <button
            type="button"
            className=" mx-2  flex-grow rounded border bg-red-500 py-1  text-white"
            onClick={() => handleDeleteClick()}
          >
            YES
          </button>
          <button
            type="button"
            className=" mx-2  flex-grow rounded border bg-green-400 py-1  text-white"
            onClick={() => setIsConfirmShowing(false)}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlayerModal;
