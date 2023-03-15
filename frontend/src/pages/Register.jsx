import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import { useRegisterUserMutation } from "../app/services/api";
import MyTextInput from "../hooks/formik/MyTextInput";
import logo from "../assets/footballsquareslogo.png";

const Register = () => {
  const [registerUser, result] = useRegisterUserMutation();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-10 text-3xl font-bold">
        <img className="h-24 w-auto" src={logo} />
      </div>
      <Formik
        initialValues={{
          first: "",
          last: "",
          email: "",
        }}
        validationSchema={Yup.object({
          first: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          last: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
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
        <Form className="mb-10 flex w-96 flex-col rounded bg-white p-5 shadow-md">
          <div className="self-center text-xl">Welcome!</div>
          <div className="mb-8 self-center text-sm text-gray-500">
            Create A New Account
          </div>
          <MyTextInput
            label="First Name"
            name="first"
            type="text"
            placeholder="First Name"
            className="mb-5 rounded border border-gray-400 px-2 py-1"
          />
          <MyTextInput
            label="Last Name"
            name="last"
            type="text"
            placeholder="Last Name"
            className="mb-5 rounded border border-gray-400 px-2 py-1"
          />
          <MyTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            className="mb-5 rounded border border-gray-400 px-2 py-1"
          />

          <button
            type="submit"
            className="mb-8 w-full self-center rounded-md border border-violet-600 bg-violet-600 px-4 py-1 text-white  hover:bg-white hover:text-violet-600"
          >
            Sign Up
          </button>
          <div className="self-center text-sm text-gray-500">
            Already Have An Account?{" "}
            <Link className="underline" to="/login">
              LOGIN
            </Link>
          </div>
        </Form>
      </Formik>
      <Link className="text-sm text-slate-400 underline" to="/">
        Back To Home
      </Link>
    </div>
  );
};

export default Register;
