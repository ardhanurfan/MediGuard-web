export function Dropdown({
  label,
  options,
  onChange,
  value,
}: {
  label: string;
  options: { label: string; value: string }[];
  onChange?: (selectedOption: { label: string; value: string } | null) => void;
  value?: { label: string; value: string } | null;
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-kGrey text-sm font-medium mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <onselect
          options={options}
          onChange={onChange}
          value={value}
          className="w-full border border-kGrey rounded-xl focus:outline-kBlue-300"
          placeholder={`Select ${label}`}
        />
      </div>
    </div>
  );
}
