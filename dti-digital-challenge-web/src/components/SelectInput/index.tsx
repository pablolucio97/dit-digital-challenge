import React, { Dispatch, SelectHTMLAttributes, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface Option {
  label: string;
  value: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  setSelectedOption: Dispatch<SetStateAction<Option>>;
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
        <Select
          onValueChange={(value) => {
            const selectedOption = options.find(
              (option) => option.value === value
            );
            setSelectedOption(selectedOption!);
          }}
        >
          <SelectTrigger className="w-full mt-2 text-[.75rem] md:text-[.9rem]">
            <SelectValue placeholder="Select an option"/>
          </SelectTrigger>
          <SelectContent style={{ zIndex: 2000 }}>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectInput;
