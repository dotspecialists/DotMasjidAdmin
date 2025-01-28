import { DatePickerProps as AntDesignDatePickerProps } from "antd";
import { DatePicker as AntDesignDatePicker } from "antd";
import { FieldError } from "react-hook-form";

interface DatePickerProps extends AntDesignDatePickerProps {
  label: string;
  error?: FieldError;
}

const DatePicker = (props: DatePickerProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500">{props.label}</label>
      <AntDesignDatePicker {...props} />
      {props.error?.message && (
        <p className="text-xs text-red-400">{props.error.message.toString()}</p>
      )}
    </div>
  );
};

export default DatePicker;
