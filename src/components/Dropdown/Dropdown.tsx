import Select from "react-select";

function Dropdown({
  label,
  options,
  onChange,
  value,
  isLabel = false,
}: {
  label: string;
  options: { label: string; value: string }[];
  onChange?: (selectedOption: { label: string; value: string } | null) => void;
  value?: { label: string; value: string } | null;
  isLabel?: boolean;
}) {
  return (
    <div className="relative mb-4">
      {isLabel && (
        <label
          htmlFor={label}
          className="block text-kGrey text-sm font-medium mb-1"
        >
          {label}
        </label>
      )}
      <Select
        options={options}
        onChange={onChange}
        value={value}
        className="basic-single rounded-lg w-full"
        placeholder={`Select ${label}`}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          border: "2px",
          colors: {
            ...theme.colors,
            primary: "#015AAB",
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "12px",
            paddingLeft: "8px",
            paddingTop: "4px",
            paddingBottom: "4px",
            border: state.isFocused ? "" : "2px solid #A8A8A8",
            "&:hover": {
              borderColor: state.isFocused ? "" : "#015AAB",
            },
          }),
          placeholder: (base) => ({
            ...base,
            fontSize: "16px",
            color: "#A8A8A8",
            fontWeight: 400,
          }),
        }}
      />
    </div>
  );
}

export default Dropdown;
