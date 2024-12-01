import { Dispatch, SetStateAction } from "react";
import { MdOutlineMotionPhotosOn } from "react-icons/md";
import Modal from "react-modal";
import SelectInput, { Option } from "../../../../components/SelectInput";
import TextInput from "../../../../components/TextInput";
import { Button } from "../../../../components/ui/button";
import { reactModalCustomStyles } from "../../../../styles/react-modal";

interface UploadPhotoToAlbumModalProps {
  isOpen: boolean;
  onConfirmAction: (param: unknown) => void;
  onClose: () => void;
  isLoading?: boolean;
  albumTitle: string;
  setAlbumTitle: Dispatch<SetStateAction<string>>;
  photoTitle: string;
  setPhotoTitle: Dispatch<SetStateAction<string>>;
  photoDescription: string;
  setPhotoDescription: Dispatch<SetStateAction<string>>;
  urlOptions: Option[];
  selectedUrlOption: Option;
  setSelectedPublicPhotoUrlOption: Dispatch<SetStateAction<Option>>;
  albumOptions: Option[];
  selectedAlbumOption: Option;
  setSelectedAlbumOption: Dispatch<SetStateAction<Option>>;
  mode: "new" | "existing";
}

const UploadPhotoToAlbumModal: React.FC<UploadPhotoToAlbumModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onConfirmAction,
  albumTitle,
  setAlbumTitle,
  photoTitle,
  setPhotoTitle,
  photoDescription,
  setPhotoDescription,
  urlOptions,
  selectedUrlOption,
  setSelectedPublicPhotoUrlOption,
  albumOptions,
  selectedAlbumOption,
  setSelectedAlbumOption,
  mode,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={reactModalCustomStyles}
    >
      <div className="flex flex-col items-center">
        <span className="text-[1rem] md:text-[1.2rem] font-bold">
          Upload photo
        </span>

        <div className="my-3">
          {mode === "existing" ? (
            <SelectInput
              label="Pick an album"
              options={albumOptions}
              setSelectedOption={setSelectedAlbumOption}
            />
          ) : (
            <TextInput
              label="Album title"
              value={albumTitle}
              onChange={(val) => setAlbumTitle(val.target.value)}
              placeholder="Provide a title for your album"
            />
          )}
        </div>

        <TextInput
          label="Photo title"
          value={photoTitle}
          onChange={(val) => setPhotoTitle(val.target.value)}
          placeholder="Provide a title for your photo"
        />

        <div className="my-3">
          <TextInput
            label="Description"
            value={photoDescription}
            onChange={(val) => setPhotoDescription(val.target.value)}
            placeholder="Provide a title for your photo (not mandatory)"
          />
        </div>

        <SelectInput
          label="Pick a picture"
          options={urlOptions}
          setSelectedOption={setSelectedPublicPhotoUrlOption}
        />

        <Button
          className="w-full h-[3rem] flex items-center text-lg mt-6 disabled:opacity-70 text-[.9rem] md:text-[1rem] hover:bg-primary "
          onClick={onConfirmAction}
          disabled={
            mode === "existing"
              ? isLoading ||
                !photoTitle ||
                !selectedUrlOption ||
                !selectedAlbumOption
              : isLoading || !photoTitle || !selectedUrlOption || !albumTitle
          }
        >
          {isLoading && (
            <MdOutlineMotionPhotosOn className="w-6 h-6 md:w-8 md:h-8 animate-spin " />
          )}
          Upload photo
        </Button>
      </div>
    </Modal>
  );
};

export default UploadPhotoToAlbumModal;
