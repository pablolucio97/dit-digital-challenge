import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "../../../../components/ui/button";

interface PhotoCardProps {
  url: string;
  title: string;
  description: string;
  showControls: boolean;
  onDelete?: () => void;
  onUpdate?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  url,
  title,
  description,
  showControls,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-md relative p-4">
      {showControls && (
        <>
          <Button
            size="icon"
            onClick={onDelete}
            className="absolute top-6 right-[1.5rem] bg-secondary hover:bg-secondary text-red-400 w-7 h-7 md:w-10 md:h-10"
          >
            <MdDelete />
          </Button>
          <Button
            size="icon"
            onClick={onUpdate}
            className="absolute top-6 right-[3.5rem] md:right-[4.5rem] bg-secondary hover:bg-secondary text-white w-7 h-7 md:w-10 md:h-10"
          >
            <MdEdit />
          </Button>
        </>
      )}
      <img
        className="w-full aspect-video rounded-md transition ease-in-out"
        src={url}
      />
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col my-2">
          <div className="w-full flex">
            <span className="mr-2 text-[.8rem] md:text-[1rem] font-bold">
              Title:{" "}
            </span>
            <span className="mr-2 text-[.8rem] md:text-[1rem]">{title}</span>
          </div>
          {description && (
            <div className="w-full flex">
              <span className="mr-2 text-[.8rem] md:text-[1rem] font-bold">
                Description:{" "}
              </span>
              <span className="mr-2 text-[.8rem] md:text-[1rem]">
                {description}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
