import { Magic } from "magic-sdk";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../components/MyTextInput";
import { ReactComponent as Logo } from "../assets/main-logo-stacked.svg";

const magic = new Magic("pk_live_C10893DD838C3541");

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-10 text-3xl font-bold">
        <Logo className="h-auto w-32" />
      </div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const { email } = values;

          const checkUserResponse = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/users/check-user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            }
          );

          const data = await checkUserResponse.json();

          console.log(data);

          if (data.userExists) {
            const didToken = await magic.auth.loginWithMagicLink({
              email,
              redirectURI: new URL("/callback", window.location.origin).href,
            });
          } else {
            navigate("/register", { state: { fromLogin: true } });
          }
        }}
      >
        <Form className="mb-10 flex w-96 flex-col rounded bg-white p-5 shadow-md">
          <div className="self-center text-xl">Welcome Back!</div>
          <div className="mb-8 self-center text-sm text-gray-500">
            Login To Your Account
          </div>
          <MyTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            className="mb-5 rounded border border-gray-400 px-2 py-1"
          />
          <button
            className="mb-8 w-full self-center rounded-md border border-violet-600 bg-violet-600 px-4 py-1 text-white  hover:bg-white hover:text-violet-600"
            type="submit"
          >
            Login In
          </button>
          <div className="self-center text-sm text-gray-500">
            Need an account?{" "}
            <Link className="underline" to="/register">
              REGISTER
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

export default Login;
