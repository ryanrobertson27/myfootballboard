import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../hooks/formik/MyTextInput";
import {
  useClearBoardMutation,
  useFillBoardMutation,
  useDeleteBoardByIdMutation,
  usePublishBoardByIdMutation,
} from "../app/services/api";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SettingsIcon } from "../assets/settings.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";

const BoardSettings = ({ board, setIsSettingsShowing }) => {
  const [clearBoard] = useClearBoardMutation();
  const [fillBoard] = useFillBoardMutation();
  const [deleteBoard] = useDeleteBoardByIdMutation();
  const [publishBoard, { isLoading: isPublishing }] =
    usePublishBoardByIdMutation();

  const navigate = useNavigate();

  const handleDeleteBoard = async () => {
    try {
      let result = await deleteBoard(board._id).unwrap();
      if (result) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        onSubmit={async (values) => {}}
      >
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center bg-black bg-opacity-50">
            <div className="rounded bg-white py-4 px-8">
              <div className="flex  items-center justify-between">
                <SettingsIcon className="mr-2 h-5 w-5" />
                <h2 className=" text-lg">Settings</h2>
                <button
                  className="mr-2 ml-auto"
                  onClick={() => setIsSettingsShowing(false)}
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              <hr className="my-5" />

              <Form className="flex flex-col items-start ">
                <div>
                  <div>Board Name</div>
                  <MyTextInput
                    label="boardName"
                    name="boardName"
                    type="text"
                    placeholder={board.boardName}
                    className="mb-5 w-full rounded border border-gray-400 px-2 py-1"
                  />
                </div>
                <div>
                  <div>Home Team</div>
                  <MyTextInput
                    label="homeTeam"
                    name="homeTeam"
                    type="text"
                    placeholder={board.homeTeam}
                    className="mb-5 w-full rounded border border-gray-400 px-2 py-1"
                  />
                </div>
                <div>
                  <div>Away Team</div>
                  <MyTextInput
                    label="awayTeam"
                    name="awayTeam"
                    type="text"
                    placeholder={board.awayTeam}
                    className="mb-5 w-full rounded border border-gray-400 px-2 py-1"
                  />
                </div>
                <div>
                  <div>Cost / Square</div>
                  <MyTextInput
                    label="costPerSquare"
                    name="costPerSquare"
                    type="number"
                    placeholder={board.costPerSquare}
                    className="mb-5 w-full rounded border border-gray-400 px-2 py-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-green-400 px-6 py-1 text-white"
                >
                  Submit
                </button>
              </Form>
              <div className="flex flex-col ">
                <hr className="my-3" />
                <div className="m-auto mb-2 text-sm italic text-gray-600">
                  Danger Zone
                </div>
                <button
                  onClick={() => handleDeleteBoard()}
                  className="mr-1 rounded bg-red-600 px-2 py-1 text-white hover:bg-red-400"
                >
                  Delete Board
                </button>
              </div>
            </div>
          </div>
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
