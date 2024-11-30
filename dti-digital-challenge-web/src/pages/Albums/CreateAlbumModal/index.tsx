import { Dispatch, SetStateAction } from "react";
import { MdOutlineMotionPhotosOn } from "react-icons/md";
import Modal from "react-modal";
import TextInput from "../../../components/TextInput";
import { Button } from "../../../components/ui/button";
import { reactModalCustomStyles } from "../../../styles/react-modal";

interface CreateAlbumModalProps {
  isOpen: boolean;
  onConfirmAction: (param: unknown) => void;
  onClose: () => void;
  isLoading?: boolean;
  albumTitle: string;
  setAlbumTitle: Dispatch<SetStateAction<string>>;
}

const CreateAlbumModal: React.FC<CreateAlbumModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onConfirmAction,
  albumTitle,
  setAlbumTitle,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={reactModalCustomStyles}
    >
      <div className="flex flex-col items-center">
        <span className="text-[1rem] md:text-[1.2rem] font-bold">
          Create album
        </span>
        <TextInput
          label="Title"
          value={albumTitle}
          onChange={(val) => setAlbumTitle(val.target.value)}
        />
        <Button
          className="w-full h-[3rem] flex items-center text-lg mt-4 disabled:opacity-70 text-[.9rem] md:text-[1rem] hover:bg-primary "
          onClick={onConfirmAction}
          disabled={isLoading}
        >
          {isLoading && (
            <MdOutlineMotionPhotosOn className="w-6 h-6 md:w-8 md:h-8 animate-spin " />
          )}
          {isLoading ? "Creating album" : "Create"}
        </Button>
      </div>
    </Modal>
  );
};

export default CreateAlbumModal;
