import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCalendar } from "react-icons/ai";

interface DateTimePickerProps {
  label: string;
  selectedDateTime: Date | null;
  onDateTimeChange: (date: Date | null) => void;
  showTimeSelect?: boolean;
  required?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  selectedDateTime,
  onDateTimeChange,
  showTimeSelect,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="datetimepicker"
        className="block text-kGrey text-sm font-medium mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <DatePicker
          required={required}
          wrapperClassName="w-full"
          id="datetimepicker"
          selected={selectedDateTime}
          onChange={(date) => onDateTimeChange(date)}
          showTimeSelect={showTimeSelect}
          dateFormat={showTimeSelect ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"}
          placeholderText="Select date and time"
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          className="w-full p-3 border border-kGrey rounded-xl focus:outline-kBlue-300"
        />
        <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-500 text-2xl">
          <AiFillCalendar />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
