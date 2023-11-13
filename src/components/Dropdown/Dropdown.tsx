import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
  selectedOption: Option;
  onSelect: (option: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
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
        <div
          onClick={handleToggleDropdown}
          className="w-full p-3 border border-kGrey rounded-xl flex items-center justify-between cursor-pointer focus:outline-kBlue-300"
        >
          <span>{selectedOption.label}</span>
          <AiFillCaretDown className="text-gray-500 text-2xl" />
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full border border-kGrey rounded-b-xl bg-white shadow-md">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelectOption(option)}
                className="p-3 cursor-pointer hover:bg-kBlue-100"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
