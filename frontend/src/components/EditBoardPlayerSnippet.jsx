import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "./MyTextInput";
import { useUpdateBoardPlayerByIdMutation } from "../app/services/api";

const EditBoardPlayerSnippet = ({ player, setIsEditShowing }) => {
  const [updateBoardPlayerById, result] = useUpdateBoardPlayerByIdMutation();

  return (
    <Formik
      initialValues={{
        email: player.email,
        venmo: player.venmo,
        phone: player.phone,
      }}
      validationSchema={Yup.object({
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
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          // TODO add update player mutation
          const data = await updateBoardPlayerById({
            userId: player._id,
            ...values,
          });
          if (data) {
            setIsEditShowing(false);
          }
        } catch (err) {
          console.log(err);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-start rounded-md bg-white text-sm">
          <hr className="my-1 w-full border-gray-200" />
          <MyTextInput
            label="email"
            name="email"
            type="text"
            className="mb-1 w-full border border-gray-200 px-1"
          />

          <MyTextInput
            label="venmo"
            name="venmo"
            type="text"
            className="mb-1  w-full border border-gray-200 px-1"
          />

          <MyTextInput
            label="phone"
            name="phone"
            type="text"
            className="mb-1  w-full border border-gray-200 px-1"
          />

          <div className="mt-2 flex w-full items-center justify-end">
            <button
              type="button"
              onClick={() => setIsEditShowing(false)}
              className="mx-1 flex-grow border border-gray-600 px-2 text-base text-gray-600 hover:bg-gray-600 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="mx-1 flex-grow border border-violet-600 px-2 text-base text-violet-600 hover:bg-violet-600 hover:text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditBoardPlayerSnippet;
