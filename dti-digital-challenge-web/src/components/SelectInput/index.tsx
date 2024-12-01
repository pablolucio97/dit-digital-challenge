import React, { Dispatch, SelectHTMLAttributes, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  setSelectedOption: Dispatch<SetStateAction<string>>;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  setSelectedOption,
}) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full md:min-w-[24rem]">
        <small className="text-[.6rem] md:text-[.8rem]">{label}</small>
        <Select onValueChange={setSelectedOption}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pick a photo" />
          </SelectTrigger>
          <SelectContent style={{ zIndex: 2000 }}>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectInput;
