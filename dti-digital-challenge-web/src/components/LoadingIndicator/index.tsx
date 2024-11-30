import { MdOutlineMotionPhotosOn } from "react-icons/md";

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <div className="w-full flex flex-col items-center mx-auto ">
      <MdOutlineMotionPhotosOn className="w-6 h-6 md:w-8 md:h-8 animate-spin mb-2" />
      <span className="text-sm md:text-[1rem]">
        {message ?? "Loading data..."}
      </span>
    </div>
  );
};

export default LoadingIndicator;
