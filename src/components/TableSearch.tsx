import Image from "next/image";
import { ChangeEvent } from "react";

// Define the props interface
interface TableSearchProps {
  value?: string; // Current value of the search input
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Function to handle input changes
  placeholder?: string; // Optional placeholder text
  className?: string; // Optional custom CSS classes
}

const TableSearch = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: TableSearchProps) => {
  return (
    <div
      className={`w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 ${className}`}
    >
      <Image src="/search.png" alt="Search icon" width={14} height={14} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
