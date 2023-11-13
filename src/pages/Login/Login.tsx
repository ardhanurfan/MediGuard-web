import Textfield from "../../components/Textfield/Textfield";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

function Login() {
  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full md:w-1/2 lg:w-1/3">
        <div className="w-full flex justify-center my-6">
          <img src="./assets/logo.svg" alt="Logo" />
        </div>
        <form onSubmit={(e) => onLogin(e)}>
          <Textfield required label={"Email"} />
          <Textfield required label={"Password"} type="password" />
          <div className="my-6 flex justify-center">
            <Button text={"Log In"} type={"submit"} />
          </div>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-kYellow">
              Register here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
