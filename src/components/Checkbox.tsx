import React from "react";

interface CheckboxProps {
  value: boolean;
  title: string;
  onChange: (n: string, e: boolean) => void;
}

export default function Checkbox({ value, title, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(title, e.target.checked)}
        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </label>
  );
}
