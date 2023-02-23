import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '../components/Header';
import { useRegisterUserMutation } from '../app/services/users';

const Register = () => {
  const [registerUser, result] = useRegisterUserMutation();

  return (
    <div>
      <Formik
        initialValues={{
          first: '',
          last: '',
          email: '',
        }}
        validationSchema={Yup.object({
          first: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          last: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        })}
        onSubmit={async (values) => {
          try {
            const data = await registerUser(values).unwrap();
            console.log(data);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Form className="m-5 flex w-96 flex-col rounded bg-white shadow">
          <div className="p-5">
            <div className="mb-5 text-lg uppercase">Sign Up</div>
            <div className="mb-5 flex">
              <div className="pr-1">
                <label htmlFor="first">First</label>
                <Field
                  type="text"
                  name="first"
                  className="border-texas-light-gray w-full rounded border px-2 py-1"
                />
                <ErrorMessage
                  name="first"
                  component="div"
                  className="-mt-3 text-red-700"
                />

                <div className="pl-">
                  <label htmlFor="last">Last</label>
                  <Field
                    type="text"
                    name="last"
                    className="border-texas-light-gray w-full rounded border px-2 py-1"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="email">Email</label>
                <Field
                  type="text"
                  name="email"
                  className="border-texas-light-gray w-full rounded border px-2 py-1"
                />
              </div>
              <div className="mb-5 flex justify-center">
                <button
                  type="submit"
                  className="blue w-full rounded bg-texas-orange py-1 text-texas-white drop-shadow"
                >
                  Sign Up
                </button>
              </div>
              <hr className="mb-5" />
            </div>
          </div>
        </Form>
      </Formik>
      <div className="flex justify-center">
        <div>
          Already a user?{' '}
          <Link to="/login" className="underline">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
