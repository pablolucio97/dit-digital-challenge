import Modal from "react-modal";
import { Button } from "../../components/ui/button";
import { reactModalCustomStyles } from "../../styles/react-modal";

interface DeleteModalProps {
  isOpen: boolean;
  onConfirmAction: (param: unknown) => void;
  onClose: () => void;
  resourceName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirmAction,
  resourceName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={reactModalCustomStyles}
    >
      <div className="flex flex-col items-center" data-testid="delete-modal">
        <span className="text-[1rem] md:text-[1.2rem] font-bold mb-3">
          Delete {resourceName}
        </span>
        <span className="text-[.8rem] md:text-[1rem]">
          Are you sure about deleting this {resourceName}? This action is not
          reversible.
        </span>
        <div className="flex items-center mt-4">
          <Button
            className="w-[8rem] h-[3rem] flex bg-red-500 hover:bg-red-500 items-center text-lg mt-4 text-[.9rem] md:text-[1rem] mr-8"
            onClick={onConfirmAction}
            data-testid="modal-delete-confirm-button"
          >
            Confirm
          </Button>
          <Button
            className="w-[8rem] h-[3rem] flex  items-center text-lg mt-4 text-[.9rem] md:text-[1rem] "
            onClick={onClose}
            variant="outline"
            data-testid="modal-delete-cancel-button"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
