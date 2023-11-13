import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Textfield({
  label,
  onChange,
  value,
  type,
  required,
}: {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[];
  type?: "normal" | "password";
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-kGrey text-sm font-medium mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          required={required}
          type={showPassword || type != "password" ? "text" : "password"}
          id={label}
          name={label}
          className="w-full p-3 border border-kGrey rounded-xl focus:outline-kBlue-300"
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
        />
        {type == "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute top-0 right-0 mt-3 mr-4 text-gray-500 cursor-pointer text-2xl"
          >
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        )}
      </div>
    </div>
  );
}

export default Textfield;
