import { Dispatch, SetStateAction } from "react";
import { MdOutlineMotionPhotosOn } from "react-icons/md";
import Modal from "react-modal";
import SelectInput, { Option } from "../../../components/SelectInput";
import TextInput from "../../../components/TextInput";
import { Button } from "../../../components/ui/button";
import { reactModalCustomStyles } from "../../../styles/react-modal";

interface HandlePhotoModalProps {
  isOpen: boolean;
  onConfirmAction: (param: unknown) => void;
  onClose: () => void;
  isLoading?: boolean;
  photoTitle: string;
  setPhotoTitle: Dispatch<SetStateAction<string>>;
  photoDescription: string;
  setPhotoDescription: Dispatch<SetStateAction<string>>;
  mode: "create" | "update";
  urlOptions: Option[];
  selectedUrlOption: Option;
  setSelectedUrlOption: Dispatch<SetStateAction<Option>>;
}

const HandlePhotoModal: React.FC<HandlePhotoModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onConfirmAction,
  photoTitle,
  setPhotoTitle,
  photoDescription,
  setPhotoDescription,
  mode,
  urlOptions,
  selectedUrlOption,
  setSelectedUrlOption,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={reactModalCustomStyles}
    >
      <div className="flex flex-col items-center">
        <span className="text-[1rem] md:text-[1.2rem] font-bold">
          {mode === "create" ? "Upload photo" : "Update photo"}
        </span>
        <TextInput
          label="Title"
          value={photoTitle}
          onChange={(val) => setPhotoTitle(val.target.value)}
          placeholder="Provide a title for your photo"
        />
        <TextInput
          label="Description"
          value={photoDescription}
          onChange={(val) => setPhotoDescription(val.target.value)}
          placeholder="Provide a title for your photo (not mandatory)"
        />

        {mode === "create" && (
          <SelectInput
            label="Pick an option"
            options={urlOptions}
            setSelectedOption={setSelectedUrlOption}
          />
        )}

        <Button
          className="w-full h-[3rem] flex items-center text-lg mt-4 disabled:opacity-70 text-[.9rem] md:text-[1rem] hover:bg-primary "
          onClick={onConfirmAction}
          disabled={isLoading || !photoTitle || !selectedUrlOption}
        >
          {isLoading && (
            <MdOutlineMotionPhotosOn className="w-6 h-6 md:w-8 md:h-8 animate-spin " />
          )}
          {mode === "create" ? "Upload photo" : "Update photo"}
        </Button>
      </div>
    </Modal>
  );
};

export default HandlePhotoModal;
