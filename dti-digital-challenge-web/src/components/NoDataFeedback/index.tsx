import { MdFindInPage } from "react-icons/md";

interface NoDataFeedbackProps {
  message?: string;
}

const NoDataFeedback: React.FC<NoDataFeedbackProps> = ({ message }) => {
  return (
    <div className="w-full flex flex-col items-center mx-auto">
      <MdFindInPage className="w-6 h-6 md:w-8 md:h-8 mb-2" />
      <span className="text-sm md:text-[1rem]">
        {message ?? "There is nothing to show."}
      </span>
    </div>
  );
};

export default NoDataFeedback;
