import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useCreateNewBoardMutation } from "../app/services/api";
import MyTextInput from "../hooks/formik/MyTextInput";

const NewBoard = () => {
  const [createBoard, result] = useCreateNewBoardMutation();
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  // TODO add payout amount for user to select via percentage or amount

  return (
    <Formik
      initialValues={{
        boardName: "",
        homeTeam: "",
        awayTeam: "",
        costPerSquare: 0,
      }}
      validationSchema={Yup.object({
        boardName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        homeTeam: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        awayTeam: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        costPerSquare: Yup.number()
          .min(0, "Must be greater than 0")
          .required("Required"),
      })}
      onSubmit={async (values) => {
        try {
          const data = await createBoard({
            email: user.email,
            ...values,
          }).unwrap(0);

          if (data) {
            console.log(data);
            navigate(`/${data._id}`);
          }
          console.log("error");
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <div className="mt-10 h-fit w-full min-w-max  max-w-xl items-center justify-center rounded-md bg-gray-50 p-5 shadow">
        <h2 className="mb-5 text-lg font-semibold">Create a New Board</h2>
        <Form className="flex flex-col items-start rounded-md  bg-white p-5">
          <div>Board Name</div>
          <MyTextInput
            label="boardName"
            name="boardName"
            type="text"
            // placeholder="My Board Name"
            className="mb-5 w-full rounded border border-gray-300 px-2 py-1"
          />
          <div>Home Team</div>
          <MyTextInput
            label="homeTeam"
            name="homeTeam"
            type="text"
            // placeholder="Home Team"
            className="mb-5 w-full rounded border border-gray-300 px-2 py-1"
          />
          <div>Away Team</div>
          <MyTextInput
            label="awayTeam"
            name="awayTeam"
            type="text"
            // placeholder="Away Team"
            className="mb-5 w-full rounded border border-gray-300 px-2 py-1"
          />
          <div>Cost / Square</div>
          <MyTextInput
            label="costPerSquare"
            name="costPerSquare"
            type="number"
            // placeholder="Cost Per Square"
            className="mb-5 w-full rounded border border-gray-300 px-2 py-1"
          />
          <div className="flex w-full justify-end">
            <Link to="/dashboard" className="mr-5">
              Cancel
            </Link>
            <button
              type="submit"
              className=" rounded bg-green-400 px-6 py-1 text-white"
            >
              Create New Board
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default NewBoard;
