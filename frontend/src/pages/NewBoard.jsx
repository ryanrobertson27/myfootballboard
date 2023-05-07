import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useCreateNewBoardMutation } from "../app/services/api";
import MyTextInput from "../components/MyTextInput";

const NewBoard = () => {
  const [createBoard, result] = useCreateNewBoardMutation();
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

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
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          const data = await createBoard({
            email: user.email,
            ...values,
          }).unwrap(0);

          if (data) {
            console.log(data);
            navigate(`/${data._id}`);
          }
        } catch (err) {
          console.log(err);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="mt-10 h-fit w-full min-w-max  max-w-xl items-center justify-center rounded-md bg-white p-5 shadow">
          <h2 className="mb-2 text-lg font-semibold">Create a New Board</h2>
          <hr className="mb-5" />
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

            <div className="flex w-full items-center justify-end">
              <Link to="/dashboard" className="mr-5">
                Cancel
              </Link>
              <button
                type="submit"
                className=" mr-2 inline-flex items-center rounded-md border border-violet-600 bg-violet-600 py-1 px-3  font-medium text-white shadow-sm hover:bg-white hover:text-violet-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default NewBoard;

{
  /* <div class="relative rounded-md shadow-sm">
  <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <span class="text-gray-500 sm:text-sm">
      $
    </span>
  </span>
  <input type="number" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" aria-describedby="price-currency">
  <span class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
    <span class="text-gray-500 sm:text-sm" id="price-currency">
      USD
    </span>
  </span>
</div> */
}
