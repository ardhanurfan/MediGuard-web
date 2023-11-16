import Textfield from "../../components/Textfield/Textfield";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { post } from "../../api/api";
import Cookies from "js-cookie";
import { toastError, toastSuccess } from "../../components/Toast/Toast";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await post("user/sign-in", {
        email: email,
        password: password,
      });
      const access_token = response?.data.data.token;
      Cookies.set("token_mediguard", access_token, { expires: 7 });
      navigate("/");
      toastSuccess("Login successfuly");
    } catch (error) {
      toastError((error as any).response.data.message as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full md:w-1/2 lg:w-1/3">
        <div className="w-full flex justify-center my-6">
          <img src="./assets/logo.svg" alt="Logo" />
        </div>
        <form onSubmit={(e) => onLogin(e)}>
          <Textfield
            required
            label={"Email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textfield
            required
            label={"Password"}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="my-6 flex justify-center">
            <Button text={"Log In"} type={"submit"} isLoading={isLoading} />
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
