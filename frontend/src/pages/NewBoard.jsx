import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCreateNewBoardMutation } from '../app/services/board';

const NewBoard = () => {
  const [createBoard, result] = useCreateNewBoardMutation();
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        boardName: '',
        homeTeam: '',
        awayTeam: '',
        costPerSquare: 0,
      }}
      validationSchema={Yup.object({
        boardName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        homeTeam: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        awayTeam: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        costPerSquare: Yup.number()
          .min(0, 'Must be greater than 0')
          .required('Required'),
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
          console.log('error');
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <div className="w-full  justify-center items-center mt-5">
        <h2 className="text-lg mb-5">Create a New Board</h2>
        <Form className="flex flex-col items-start w-96 bg-white rounded-md shadow p-5">
          <label htmlFor="boardName" className="mb-1">
            Board Name
          </label>
          <Field
            name="boardName"
            type="text"
            className="border rounded px-1 mb-3"
          />
          <ErrorMessage
            name="boardName"
            component="div"
            className="text-red-700 -mt-3"
          />

          <label htmlFor="homeTeam" className="mb-1">
            Home Team
          </label>
          <Field
            name="homeTeam"
            type="text"
            className="border rounded px-1 mb-3"
          />
          <ErrorMessage
            name="homeTeam"
            component="div"
            className="text-red-700 -mt-3"
          />

          <label htmlFor="awayTeam" className="mb-1">
            Away Team
          </label>
          <Field
            name="awayTeam"
            type="text"
            className="border rounded px-1 mb-3"
          />
          <ErrorMessage
            name="awayTeam"
            component="div"
            className="text-red-700 -mt-3"
          />

          <label htmlFor="costPerSquare" className="mb-1">
            Cost Per Square
          </label>
          <Field
            name="costPerSquare"
            type="number"
            className="border rounded px-1 mb-3"
          />
          <ErrorMessage
            name="costPerSquare"
            component="div"
            className="text-red-700 -mt-3"
          />

          <button
            type="submit"
            className="px-6 py-1 bg-green-400 text-white rounded"
          >
            Submit
          </button>
        </Form>
        <h2 className="text-lg">Preview</h2>
      </div>
    </Formik>
  );
};

export default NewBoard;
