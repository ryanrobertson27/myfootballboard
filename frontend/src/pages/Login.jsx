import { useState, useContext } from "react";
import { Magic } from "magic-sdk";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../features/user/userSlice";
import Header from "../components/Header";

const magic = new Magic("pk_live_C10893DD838C3541");

const Login = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // TODO add to RTK query
    const checkUserResponse = await fetch(
      "http://localhost:8000/users/check-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await checkUserResponse.json();

    if (data.userExists) {
      const didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href,
      });
    } else {
      // TODO add a reason why they got redirected to register
      navigate("/register");
    }
  };

  return (
    <form
      className="m-5 flex w-96 flex-col rounded bg-white shadow"
      onSubmit={handleLogin}
    >
      <div className="p-5">
        <div className="mb-5 text-lg uppercase">Login</div>
        <div className="mb-5">
          <div>Email</div>
          <input
            type="email"
            className="w-full rounded border border-texas-light-gray px-2 py-1"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-5 flex justify-center">
          <button
            type="submit"
            className="w-full rounded bg-texas-orange py-1  text-white drop-shadow"
          >
            Login
          </button>
        </div>
        <hr className="mb-5" />
        <div className="flex justify-center">
          <div>
            Need an account?{" "}
            <Link to="/register" className="text-texas-orange underline">
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
