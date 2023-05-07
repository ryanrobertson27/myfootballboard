import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { remove, clear, setDisabled } from "../features/square/squareSlice";
import * as Yup from "yup";
import { useCreateNewBoardPlayerMutation } from "../app/services/api";
import MyTextInput from "./MyTextInput";

const NewPlayerForm = ({ board, setFormIsShowing }) => {
  const [createNewBoardPlayer, result] = useCreateNewBoardPlayerMutation();
  const dispatch = useDispatch();
  const squares = useSelector((state) => state.squareSelect.squares);

  const handleFormClose = () => {
    dispatch(clear());
    dispatch(setDisabled());
    setFormIsShowing(false);
  };

  return (
    <div>
      <Formik
        initialValues={{
          first: "",
          last: "",
          email: "",
          venmo: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          first: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          last: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .max(40, "Must be 40 characters or less")
            .required("Required"),
          venmo: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          phone: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values) => {
          try {
            const data = await createNewBoardPlayer({
              boardId: board._id,
              ...values,
              squares: squares,
            });
            if (data) {
              dispatch(clear());
              dispatch(setDisabled());
              setFormIsShowing(false);
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <div className=" items-center justify-center">
          <Form className="flex flex-col items-start rounded-sm border border-gray-200 bg-white p-2">
            <div className="mb-4 flex w-full items-center justify-between border-b">
              <div className=" mb-1 text-lg">Create New Player</div>
              <button
                type="button"
                className="text-red-500"
                onClick={() => handleFormClose()}
              >
                Cancel
              </button>
            </div>
            <div className="itmes-center flex w-full justify-between">
              <MyTextInput
                label="first"
                name="first"
                type="text"
                placeholder="first"
                className="mb-1 mr-1 w-full rounded border border-gray-200 px-1 py-1"
              />
              <MyTextInput
                label="last"
                name="last"
                type="text"
                placeholder="last"
                className="mb-1 ml-1 w-full rounded border border-gray-200 px-1 py-1"
              />
            </div>

            <MyTextInput
              label="email"
              name="email"
              type="email"
              placeholder="email"
              className="mb-1 w-full rounded border border-gray-200 px-1 py-1"
            />

            <MyTextInput
              label="venmo"
              name="venmo"
              type="text"
              placeholder="venmo"
              className="mb-1 w-full rounded border border-gray-200 px-1 py-1"
            />

            <MyTextInput
              label="phone"
              name="phone"
              type="text"
              placeholder="phone"
              className="mb-4 w-full rounded border border-gray-200 px-1 py-1"
            />
            <div>Add Squares</div>
            <div className="mb-4 flex w-full flex-wrap border">
              {squares.length >= 1 ? (
                <>
                  {squares.map((square) => {
                    return (
                      <button
                        type="button"
                        onClick={() => dispatch(remove(square))}
                        className=" m-2 flex aspect-square h-12 w-12 items-center justify-center border hover:border-red-500 hover:text-red-500 "
                      >
                        {square.position}
                      </button>
                    );
                  })}
                  <button
                    className=" m-2 flex aspect-square h-12 w-12 items-center justify-center border border-yellow-500 text-yellow-500 "
                    type="button"
                    onClick={() => dispatch(clear())}
                  >
                    Clear
                  </button>
                </>
              ) : (
                <div className="p-2 italic text-gray-500">
                  select squares to add to user
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full flex-grow border border-violet-600 bg-violet-600 px-2 text-white hover:bg-white hover:text-violet-600"
            >
              Submit
            </button>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default NewPlayerForm;
