import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "../../../components/ui/button";

interface AlbumCardProps {
  title: string;
  showControls: boolean;
  onSeeAlbum: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  title,
  showControls,
  onDelete,
  onUpdate,
  onSeeAlbum,
}) => {
  return (
    <div className="w-full min-h-[12rem] flex items-center justify-center p-4  bg-gradient-to-r from-primary to-[#6BE0EF] rounded-md relative">
      <Button
        className="absolute top-2 left-2 bg-transparent hover:bg-transparent font-bold"
        variant="ghost"
        onClick={onSeeAlbum}
      >
        See album
      </Button>
      {showControls && (
        <>
          <Button
            size="icon"
            onClick={onUpdate}
            className="absolute top-2 right-[3.5rem] bg-secondary hover:bg-secondary text-white"
          >
            <MdEdit />
          </Button>
          <Button
            size="icon"
            onClick={onDelete}
            className="absolute top-2 right-2 bg-secondary hover:bg-secondary text-red-400"
          >
            <MdDelete />
          </Button>
        </>
      )}
      <span className="mr-2 text-xl md:text-2xl font-bold">{title}</span>
    </div>
  );
};

export default AlbumCard;
