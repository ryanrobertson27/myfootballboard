import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../hooks/formik/MyTextInput";
import {
  useClearBoardMutation,
  useFillBoardMutation,
} from "../app/services/api";

const BoardSettings = ({ board }) => {
  const [clearBoard] = useClearBoardMutation();
  const [fillBoard] = useFillBoardMutation();

  return (
    <>
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
          console.log("submitted");
        }}
      >
        <div className="mt-5  items-center justify-center">
          <h2 className="mb-5 text-lg">Settings</h2>
          <button
            onClick={() => clearBoard(board._id)}
            className="bg-yellow-400 px-2 text-white"
          >
            Clear Board
          </button>
          <button
            onClick={() => fillBoard(board._id)}
            className="bg-green-400 px-2 text-white"
          >
            Fill Board
          </button>
          <Form className="flex items-start ">
            <div>
              <div>Board Name</div>
              <MyTextInput
                label="boardName"
                name="boardName"
                type="text"
                placeholder={board.boardName}
                className="mb-5 rounded border border-gray-400 px-2 py-1"
              />
            </div>
            <div>
              <div>Home Team</div>
              <MyTextInput
                label="homeTeam"
                name="homeTeam"
                type="text"
                placeholder={board.homeTeam}
                className="mb-5 rounded border border-gray-400 px-2 py-1"
              />
            </div>
            <div>
              <div>Away Team</div>
              <MyTextInput
                label="awayTeam"
                name="awayTeam"
                type="text"
                placeholder={board.awayTeam}
                className="mb-5 rounded border border-gray-400 px-2 py-1"
              />
            </div>
            <div>
              <div>Cost / Square</div>
              <MyTextInput
                label="costPerSquare"
                name="costPerSquare"
                type="number"
                placeholder={board.costPerSquare}
                className="mb-5 rounded border border-gray-400 px-2 py-1"
              />
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
    </>
  );
};

export default BoardSettings;

// Board Settings
// Board Name
// cost per square
// Home Team
// Away Team
// Home Numbers
// Away Numbers
