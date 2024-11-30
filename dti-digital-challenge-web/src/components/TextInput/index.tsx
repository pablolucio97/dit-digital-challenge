import React, { InputHTMLAttributes } from "react";
import { Input } from "../ui/input";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...rest }) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full md:min-w-[24rem]">
        <small className="text-[.6rem] md:text-[.8rem]">{label}</small>
        <Input
          id="task-name"
          type="text"
          placeholder="Task name"
          className="text-[.75rem] md:text-[.8rem] mt-1 h-[3rem] "
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextInput;
