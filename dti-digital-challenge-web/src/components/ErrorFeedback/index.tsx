import { MdError } from "react-icons/md";

interface ErrorFeedbackProps {
  message?: string;
}

const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center mx-auto ">
      <MdError className="w-6 h-6 md:w-8 md:h-8 text-red-500 mb-2" />
      <span className="text-sm md:text-[1rem]">
        {message ?? "Something went wrong. Please, try again later."}
      </span>
    </div>
  );
};

export default ErrorFeedback;
