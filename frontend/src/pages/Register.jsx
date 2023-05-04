import { Magic } from "magic-sdk";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../components/MyTextInput";
import { useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/main-logo-stacked.svg";

const magic = new Magic("pk_live_C10893DD838C3541");

const Register = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-10 text-3xl font-bold">
        <Logo className="h-auto w-32" />{" "}
      </div>
      <Formik
        initialValues={{
          first: "",
          last: "",
          email: "",
          phone: "",
          venmo: "",
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
            // currently leaving out of RTK query because of headers
            const registeredUser = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/users/register`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }
            );

            const data = await registeredUser.json();

            if (data) {
              const { email } = data;
              const didToken = await magic.auth.loginWithMagicLink({
                email,
                redirectURI: new URL("/callback", window.location.origin).href,
              });
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Form className="mb-10 flex w-96 flex-col rounded bg-white p-5 shadow-md">
          {location.state?.fromLogin ? (
            <div className="mb-3 text-center text-red-500">
              An account with that email does not exist. Please create an
              account!
            </div>
          ) : (
            <>
              <div className="self-center text-xl">Welcome!</div>
              <div className="mb-8 self-center text-sm text-gray-500">
                Create A New Account
              </div>
            </>
          )}

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
            label="Phone Number"
            name="phone"
            type="text"
            placeholder="(123)-456-7890"
            className="mb-5 rounded border border-gray-400 px-2 py-1"
          />
          <MyTextInput
            label="Venmo"
            name="venmo"
            type="text"
            placeholder="venmo"
            className="mb-5 rounded border border-gray-400 px-2 py-1"
          />
          <MyTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="example@example.com"
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
