import Modal from "react-modal";
import { Button } from "../../../../components/ui/button";
import { reactModalCustomStyles } from "../../../../styles/react-modal";

interface AddPhotoIntroductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadToExistingAlbum: () => void;
  onUploadToNewAlbum: () => void;
}

const AddPhotoIntroductionModal: React.FC<AddPhotoIntroductionModalProps> = ({
  isOpen,
  onClose,
  onUploadToExistingAlbum,
  onUploadToNewAlbum,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={reactModalCustomStyles}
    >
      <div className="w-full flex flex-col">
        <span className="text-md md:text-xl font-bold text-center mb-4">
          How would you like to upload your picture?
        </span>
        <Button
          className="w-full h-[3rem] flex items-center text-lg mt-4 disabled:opacity-70 text-[.9rem] md:text-[1rem] hover:bg-primary font-bold"
          onClick={onUploadToExistingAlbum}
        >
          Upload it to an existing album
        </Button>
        <span className="text-md md:text-lg text-center mt-3">or</span>
        <Button
          className="w-full h-[3rem] flex items-center text-lg mt-4 disabled:opacity-70 text-[.9rem] md:text-[1rem] hover:bg-primary font-bold"
          onClick={onUploadToNewAlbum}
        >
          Upload it to a new album
        </Button>
      </div>
    </Modal>
  );
};

export default AddPhotoIntroductionModal;
