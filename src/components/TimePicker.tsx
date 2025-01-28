import { TimePickerProps as AntDesignTimerPickerProps } from "antd";
import { TimePicker as AntDesignTimePicker } from "antd";
import { FieldError } from "react-hook-form";

interface TimePickerProps extends AntDesignTimerPickerProps {
  label: string;
  error?: FieldError;
}

const TimePicker = (props: TimePickerProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500">{props.label}</label>
      <AntDesignTimePicker {...props} />
      {props.error?.message && (
        <p className="text-xs text-red-400">{props.error.message.toString()}</p>
      )}
    </div>
  );
};

export default TimePicker;
