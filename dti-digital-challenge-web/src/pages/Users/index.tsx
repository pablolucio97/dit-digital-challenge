import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ErrorFeedback from "../../components/ErrorFeedback";
import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import { Option } from "../../components/SelectInput";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { UserDTO } from "../../repositories/dtos/usersDTO";
import { AlbumsRepositoryImplementation } from "../../repositories/implementation/albumsRepository";
import { PhotosRepositoryImplementation } from "../../repositories/implementation/photosRepository";
import { UsersRepositoryImplementation } from "../../repositories/implementation/usersRepository";
import { useAuthenticationStore } from "../../store/auth";
import { useLoading } from "../../store/loading";
import AddPhotoIntroductionModal from "./components/AddPhotoIntroductionModal";
import UploadPhotoToAlbumModal from "./components/UploadPhotoToAlbumModal";
import UserCard from "./components/UserCard";

const Users: React.FC = () => {
  const [uploadPhotoIntroductionModal, setUploadPhotoIntroductionModal] =
    useState(false);
  const [
    uploadPhotoIntoExistingAlbumModal,
    setUploadPhotoIntoExistingAlbumModal,
  ] = useState(false);
  const [uploadPhotoIntoNewAlbumModal, setUploadPhotoIntoNewAlbumModal] =
    useState(false);
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [albums, setAlbums] = useState<Option[]>([]);
  const [publicPhotosURLs, setPublicPhotosURLs] = useState<Option[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Option>({
    value: "",
    label: "",
  });
  const [selectedPublicPhotoURL, setSelectedPublicPhotoURL] = useState<Option>({
    value: "",
    label: "",
  });
  const [albumTitle, setAlbumTitle] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [uploadPhotoAlbumMode, setUploadPhotoAlbumMode] = useState<
    "new" | "existing"
  >("new");

  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    isAuthenticated,
    signIn,
    signOut,
    user: authenticatedUser,
  } = useAuthenticationStore();

  const userId = authenticatedUser === null ? 0 : authenticatedUser.id;

  const { loading, setLoading } = useLoading();

  const usersRepository = useMemo(() => {
    return new UsersRepositoryImplementation();
  }, []);

  const albumsRepository = useMemo(() => {
    return new AlbumsRepositoryImplementation();
  }, []);

  const photosRepository = useMemo(() => {
    return new PhotosRepositoryImplementation();
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const users = await usersRepository.listUsers();
      setUsers(users);
      return users;
    } catch (error) {
      console.log(error);
    }
  }, [usersRepository]);

  const getAlbums = useCallback(async () => {
    try {
      const albums = await albumsRepository.listAlbumsByUser(userId);
      const albumsNames = albums.map((album) => ({
        value: album.id.toString(),
        label: album.title,
      }));
      setAlbums(albumsNames);
      return albums;
    } catch (error) {
      console.log(error);
    }
  }, [albumsRepository, userId]);

  const getPublicPhotosURLs = useCallback(async () => {
    try {
      const publicPhotos = await photosRepository.listPublicPhotos();
      const urls = publicPhotos.map((photo) => ({
        value: photo.url,
        label: photo.url,
      }));
      setPublicPhotosURLs(urls);
      return publicPhotos;
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error at trying to fetch public photos. Please, try again later.",
        variant: "destructive",
      });
      console.log(error);
    }
  }, [photosRepository, toast]);

  const { isLoading: isPublicPhotosLoading, error: publicPhotosError } =
    useQuery({
      queryKey: ["public-photos"],
      queryFn: getPublicPhotosURLs,
    });

  const { isLoading: isUsersLoading, error: usersError } = useQuery({
    queryKey: ["user", userId],
    queryFn: getUsers,
  });

  const { isLoading: isAlbumsLoading, error: albumsError } = useQuery({
    queryKey: ["albums", userId],
    queryFn: getAlbums,
  });

  const handleSeeAlbums = (userId: string) => {
    navigate(`/albums?userId=${userId}`);
  };

  const handleAuthenticate = (user: UserDTO) => {
    signIn(user);
  };

  const handleSignOut = () => {
    signOut();
    window.location.reload();
  };

  const handleToggleUploadPhotoIntroductionModal = useCallback(() => {
    setUploadPhotoIntroductionModal(!uploadPhotoIntroductionModal);
  }, [uploadPhotoIntroductionModal]);

  const handleProceedWithExistingAlbumModal = useCallback(() => {
    setUploadPhotoAlbumMode("existing");
    handleToggleUploadPhotoIntroductionModal();
    setUploadPhotoIntoExistingAlbumModal(!uploadPhotoIntoExistingAlbumModal);
  }, [
    handleToggleUploadPhotoIntroductionModal,
    uploadPhotoIntoExistingAlbumModal,
  ]);

  const handleProceedWithNewAlbumModal = useCallback(() => {
    setUploadPhotoAlbumMode("new");
    handleToggleUploadPhotoIntroductionModal();
    setUploadPhotoIntoNewAlbumModal(!uploadPhotoIntoNewAlbumModal);
  }, [handleToggleUploadPhotoIntroductionModal, uploadPhotoIntoNewAlbumModal]);

  const handleUploadPhotoToExistingAlbum = useCallback(async () => {
    try {
      setLoading(true);
      await photosRepository.createPhoto({
        title: photoTitle,
        description: photoDescription,
        albumId: parseInt(selectedAlbum.value),
        url: selectedPublicPhotoURL.label,
        thumbnailUrl: selectedPublicPhotoURL.label.replace("600", "150"),
      });
      toast({
        title: "Success",
        description: "Photo uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error at trying to upload photo. Please, try again later.",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setLoading(false);
      setUploadPhotoIntoExistingAlbumModal(false);
      setPhotoTitle("");
      setPhotoDescription("");
      setSelectedPublicPhotoURL({ value: "", label: "" });
      setSelectedAlbum({ value: "", label: "" });
      setAlbumTitle("");
    }
  }, [
    photoDescription,
    photoTitle,
    photosRepository,
    selectedAlbum.value,
    selectedPublicPhotoURL.label,
    setLoading,
    toast,
  ]);

  const handleUploadPhotoToNewAlbum = useCallback(async () => {
    try {
      setLoading(true);
      const newAlbum = await albumsRepository.createAlbum({
        title: albumTitle,
        userId,
      });

      await photosRepository.createPhoto({
        title: photoTitle,
        description: photoDescription,
        albumId: newAlbum.id,
        url: selectedPublicPhotoURL.label,
        thumbnailUrl: selectedPublicPhotoURL.label.replace("600", "150"),
      });

      toast({
        title: "Success",
        description: "Photo uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error at trying to upload photo. Please, try again later.",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setLoading(false);
      setAlbumTitle("");
      setPhotoTitle("");
      setPhotoDescription("");
      setSelectedPublicPhotoURL({ value: "", label: "" });
      setSelectedAlbum({ value: "", label: "" });
    }
  }, [
    albumTitle,
    albumsRepository,
    photoDescription,
    photoTitle,
    photosRepository,
    selectedPublicPhotoURL.label,
    setLoading,
    toast,
    userId,
  ]);

  const isLoading = isUsersLoading || isAlbumsLoading || isPublicPhotosLoading;
  const error = usersError || albumsError || publicPhotosError;

  return (
    <main className="w-full flex flex-col pt-[4rem]">
      <Header pageTitle="Users" />
      <div className="w-full max-w-[1080px] flex flex-col mx-auto mt-[2rem]">
        <div className="flex flex-row w-full justify-between items-center mb-4">
          <h1 className="text-lg md:text-2xl font-bold ml-4">Users</h1>
          <Button
            className="bg-secondary text-md font-bold text-sm md:text-md mt-3 md:mt-[0] hover:bg-secondary mr-4"
            size="lg"
            onClick={handleToggleUploadPhotoIntroductionModal}
            disabled={userId === 0}
          >
            <MdAddCircleOutline className="w-[2rem] h-[2rem]" />
            Upload photo
          </Button>
        </div>
        {isLoading ? (
          <div className="w-full h-full mt-[4rem]">
            <LoadingIndicator />
          </div>
        ) : error ? (
          <div className="w-full h-full mt-[4rem]">
            <ErrorFeedback />
          </div>
        ) : (
          <div className="flex flex-col w-full p-4 my-3 max-h-[75vh] overflow-auto">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onSeeAlbums={() => handleSeeAlbums(user.id.toString())}
                isAuthenticated={isAuthenticated}
                onAuthenticate={() => handleAuthenticate(user)}
                onSignOut={handleSignOut}
              />
            ))}
          </div>
        )}
      </div>
      <AddPhotoIntroductionModal
        isOpen={uploadPhotoIntroductionModal}
        onClose={handleToggleUploadPhotoIntroductionModal}
        onUploadToExistingAlbum={handleProceedWithExistingAlbumModal}
        onUploadToNewAlbum={handleProceedWithNewAlbumModal}
      />
      <UploadPhotoToAlbumModal
        isOpen={
          uploadPhotoAlbumMode === "new"
            ? uploadPhotoIntoNewAlbumModal
            : uploadPhotoIntoExistingAlbumModal
        }
        onClose={
          uploadPhotoAlbumMode === "new"
            ? handleProceedWithNewAlbumModal
            : handleProceedWithExistingAlbumModal
        }
        albumOptions={albums}
        onConfirmAction={
          uploadPhotoAlbumMode === "new"
            ? handleUploadPhotoToNewAlbum
            : handleUploadPhotoToExistingAlbum
        }
        setSelectedAlbumOption={setSelectedAlbum}
        selectedAlbumOption={selectedAlbum}
        photoDescription={photoDescription}
        setPhotoDescription={setPhotoDescription}
        photoTitle={photoTitle}
        setPhotoTitle={setPhotoTitle}
        isLoading={loading}
        urlOptions={publicPhotosURLs}
        selectedUrlOption={selectedPublicPhotoURL}
        setSelectedPublicPhotoUrlOption={setSelectedPublicPhotoURL}
        mode={uploadPhotoAlbumMode}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
      />
    </main>
  );
};

export default Users;
