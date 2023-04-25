import { Formik, Form } from "formik";
import { useEffect } from "react";
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
        <div className="mt-5  items-center justify-center">
          <Form className="flex flex-col items-start rounded-md bg-white p-5 shadow">
            <div className="mb-4 flex w-full items-center justify-between border-b">
              <div className=" text-lg">Create New Player</div>
              <button
                type="button"
                className="text-red-500"
                onClick={() => handleFormClose()}
              >
                Cancel
              </button>
            </div>
            <div>First</div>
            <MyTextInput
              label="first"
              name="first"
              type="text"
              // placeholder="My Board Name"
              className="mb-4 rounded border border-gray-400 px-2 py-1"
            />
            <div>Last</div>
            <MyTextInput
              label="last"
              name="last"
              type="text"
              // placeholder="Home Team"
              className="mb-4 rounded border border-gray-400 px-2 py-1"
            />
            <div>Email</div>
            <MyTextInput
              label="email"
              name="email"
              type="email"
              // placeholder="Away Team"
              className="mb-4 rounded border border-gray-400 px-2 py-1"
            />
            <div>Venmo</div>
            <MyTextInput
              label="venmo"
              name="venmo"
              type="text"
              // placeholder="Cost Per Square"
              className="mb-4 rounded border border-gray-400 px-2 py-1"
            />
            <div>Phone</div>
            <MyTextInput
              label="phone"
              name="phone"
              type="text"
              // placeholder="Cost Per Square"
              className="mb-4 rounded border border-gray-400 px-2 py-1"
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
              className="w-full rounded bg-green-400 px-6 py-1 text-white"
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
