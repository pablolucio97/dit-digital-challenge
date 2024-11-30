import { MdDelete } from "react-icons/md";
import { Button } from "../../../components/ui/button";

interface PhotoCardProps {
  url: string;
  showControls: boolean;
  onDelete?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  url,
  showControls,
  onDelete,
}) => {
  return (
    <div className="relative">
      {showControls && (
        <Button
          size="icon"
          onClick={onDelete}
          className="absolute top-2 right-2 bg-secondary hover:bg-secondary text-red-400"
        >
          <MdDelete />
        </Button>
      )}
      <img
        className="w-[24rem] aspect-video rounded-md transition ease-in-out"
        src={url}
      />
    </div>
  );
};

export default PhotoCard;
