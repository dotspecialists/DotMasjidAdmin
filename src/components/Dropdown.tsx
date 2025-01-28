import React from "react";
import { FieldError } from "react-hook-form";

type ValueType = {
  id: number;
  name: string;
};

type DropdownProps = {
  label: string;
  value?: number;
  name: string;
  defaultValue: number;
  options: ValueType[];
  error?: FieldError;
  register?: any;
  disabled?: boolean; // Added disabled prop
};

export default function Dropdown(props: DropdownProps) {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500">{props.label}</label>
      <select
        className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${
          props.disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
        }`}
        {...props?.register?.(props.name)}
        value={props.value}
        defaultValue={props.defaultValue}
        disabled={props.disabled} // Apply disabled prop
      >
        {props.options?.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {props.error?.message && (
        <p className="text-xs text-red-400">{props.error.message.toString()}</p>
      )}
    </div>
  );
}
