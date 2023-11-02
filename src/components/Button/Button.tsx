import { FormEventHandler, MouseEventHandler } from "react";

function Button({
  text,
  type,
  onClick,
  onSubmit,
  isLoading,
}: {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
  isLoading?: boolean;
}) {
  return (
    <>
      <button
        disabled={isLoading}
        type={type}
        onClick={onClick}
        onSubmit={onSubmit}
        className={`h-[28px] w-[160px] rounded-[4px] text-12 md:h-[32px] md:w-[200px] bg-kBlue-200 text-white hover:bg-kBlue-300 active:bg-kBlue-400`}
      >
        {isLoading ? (
          <div className={`flex items-center justify-center`}>
            <svg
              className="mr-3 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          text
        )}
      </button>
    </>
  );
}

export default Button;
