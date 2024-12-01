import { MdDelete } from "react-icons/md";
import { Button } from "../../../components/ui/button";

interface PhotoCardProps {
  url: string;
  title: string;
  description: string;
  showControls: boolean;
  onDelete?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  url,
  title,
  description,
  showControls,
  onDelete,
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-md relative p-4">
      {showControls && (
        <Button
          size="icon"
          onClick={onDelete}
          className="absolute top-6 right-6 bg-secondary hover:bg-secondary text-red-400"
        >
          <MdDelete />
        </Button>
      )}
      <img
        className="w-[24rem] aspect-video rounded-md transition ease-in-out"
        src={url}
      />
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col my-2">
          <div className="w-full flex">
            <span className="mr-2 text-sm md:text-lg font-bold">Title: </span>
            <span className="mr-2 text-sm md:text-lg">{title}</span>
          </div>
          {description && (
            <div className="w-full flex">
              <span className="mr-2 text-sm md:text-lg font-bold">
                Description:{" "}
              </span>
              <span className="mr-2 text-sm md:text-lg">{description}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
