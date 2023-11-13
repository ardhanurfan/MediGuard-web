import Textfield from "../../components/Textfield/Textfield";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

function Register() {
  const onRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full md:w-1/2 lg:w-1/3">
        <div className="w-full flex justify-center my-6">
          <img src="./assets/logo.svg" alt="Logo" />
        </div>
        <form onSubmit={(e) => onRegister(e)}>
          <Textfield required label={"Nama Lengkap"} />
          <Textfield required label={"Email"} />
          <Textfield required label={"Password"} type="password" />
          <Textfield required label={"Confirm Password"} type="password" />
          <div className="my-6 flex justify-center">
            <Button text={"Register"} type={"submit"} />
          </div>
          <p className="text-sm text-center text-gray-600">
            You have an account?{" "}
            <Link to="/login" className="text-kYellow">
              Log in here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
