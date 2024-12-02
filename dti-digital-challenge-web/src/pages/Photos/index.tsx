import {
  InvalidateQueryFilters,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import ErrorFeedback from "../../components/ErrorFeedback";
import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import NoDataFeedback from "../../components/NoDataFeedback";
import { Option } from "../../components/SelectInput";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { PhotoDTO } from "../../repositories/dtos/photosDTO";
import { UserDTO } from "../../repositories/dtos/usersDTO";
import { PhotosRepositoryImplementation } from "../../repositories/implementation/photosRepository";
import { UsersRepositoryImplementation } from "../../repositories/implementation/usersRepository";
import { useAuthenticationStore } from "../../store/auth";
import { useLoading } from "../../store/loading";
import HandlePhotoModal from "./components/HandlePhotoModal";
import PhotoCard from "./components/PhotoCard";

const Photos: React.FC = () => {
  const [createPhotoModal, setCreatePhotoModal] = useState(false);
  const [updatePhotoModal, setUpdatePhotoModal] = useState(false);
  const [deletePhotoModal, setDeletePhotoModal] = useState(false);
  const [photos, setPhotos] = useState<PhotoDTO[]>([]);
  const [publicPhotosURLs, setPublicPhotosURLs] = useState<Option[]>([]);
  const [selectedPublicURL, setSelectedPublicURL] = useState<Option>({
    value: "",
    label: "",
  });
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDTO | null>(null);
  const [user, setUser] = useState<UserDTO | null>(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");

  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const albumId = useMemo(
    () => Number(searchParams.get("albumId")),
    [searchParams]
  );

  const userId = useMemo(
    () => Number(searchParams.get("userId")),
    [searchParams]
  );

  const { user: authenticatedUser } = useAuthenticationStore();
  const { loading, setLoading } = useLoading();

  const photosRepository = useMemo(() => {
    return new PhotosRepositoryImplementation();
  }, []);

  const usersRepository = useMemo(() => {
    return new UsersRepositoryImplementation();
  }, []);

  const getPhotos = useCallback(async () => {
    try {
      const photos = await photosRepository.listPhotosByAlbum(albumId);
      setPhotos(photos);
      return photos;
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error at trying to fetch photos. Please, try again later.",
        variant: "destructive",
      });
      console.log(error);
    }
  }, [albumId, photosRepository, toast]);

  const getPublicPhotosURLs = useCallback(async () => {
    try {
      const publicPhotos = await photosRepository.listPublicPhotos();
      const urls = publicPhotos.map((photo) => ({
        label: photo.url,
        value: photo.url,
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

  const getUser = useCallback(async () => {
    try {
      const user = await usersRepository.getUser(userId);
      setUser(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }, [userId, usersRepository]);

  const { isLoading: isUserLoading, error: userError } = useQuery({
    queryKey: ["user", userId],
    queryFn: getUser,
  });

  const { isLoading: isPhotosLoading, error: photosError } = useQuery({
    queryKey: ["photos"],
    queryFn: getPhotos,
  });

  const { isLoading: isPublicPhotosLoading, error: publicPhotosError } =
    useQuery({
      queryKey: ["public-photos"],
      queryFn: getPublicPhotosURLs,
    });

  const isLoading = isUserLoading || isPhotosLoading || isPublicPhotosLoading;
  const error = userError || photosError || publicPhotosError;

  const handleToggleCreatePhotoModal = useCallback(() => {
    setCreatePhotoModal(!createPhotoModal);
  }, [createPhotoModal]);

  const handleCreatePhoto = useCallback(async () => {
    try {
      setLoading(true);
      if (selectedPublicURL) {
        await photosRepository.createPhoto({
          title: photoTitle,
          description: photoDescription,
          albumId,
          url: selectedPublicURL.label,
          thumbnailUrl: selectedPublicURL.label.replace("600", "150"),
        });
      }
      toast({
        title: "Success",
        description: "Photo uploaded successfully!",
      });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "statusCode" in error &&
        error.statusCode === 409
      ) {
        toast({
          title: "Error",
          description:
            "There is a photo with this title already for this album. Please provide another title.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description:
            "There was an error trying to upload photo. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
      queryClient.invalidateQueries(["photos"] as InvalidateQueryFilters);
      handleToggleCreatePhotoModal();
      setPhotoTitle("");
      setPhotoDescription("");
      setSelectedPublicURL({ value: "", label: "" });
    }
  }, [
    albumId,
    handleToggleCreatePhotoModal,
    photoDescription,
    photoTitle,
    photosRepository,
    queryClient,
    selectedPublicURL,
    setLoading,
    toast,
  ]);

  const handleToggleDeletePhotoModal = useCallback(
    (photo: PhotoDTO | null) => {
      setSelectedPhoto(photo);
      setDeletePhotoModal(!deletePhotoModal);
    },
    [deletePhotoModal]
  );

  const handleDeletePhotoConfirmation = useCallback(
    async (photoId: number) => {
      try {
        setLoading(true);
        await photosRepository.deletePhoto(photoId);
        toast({
          title: "Success",
          description: "Photo deleted successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            "There was an error at trying to delete this photo. Please, try again later.",
          variant: "destructive",
        });
        console.log(error);
      } finally {
        setLoading(false);
        queryClient.invalidateQueries(["photos"] as InvalidateQueryFilters);
        handleToggleDeletePhotoModal(null);
      }
    },
    [
      setLoading,
      photosRepository,
      toast,
      queryClient,
      handleToggleDeletePhotoModal,
    ]
  );

  const handleToggleUpdatePhotoModal = useCallback(
    (photo: PhotoDTO | null) => {
      setSelectedPhoto(photo);
      setUpdatePhotoModal(!updatePhotoModal);
    },
    [updatePhotoModal]
  );

  const handleUpdatePhoto = useCallback(async () => {
    try {
      if (selectedPhoto) {
        setLoading(true);
        await photosRepository.updatePhoto({
          id: selectedPhoto.id,
          albumId: selectedPhoto.albumId!,
          description: photoDescription,
          title: photoTitle,
        });
      }
      toast({
        title: "Success",
        description: "Photo updated successfully!",
      });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "statusCode" in error &&
        error.statusCode === 409
      ) {
        toast({
          title: "Error",
          description:
            "There is a photo with this title already for this album. Please provide another title.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description:
            "There was an error trying to upload photo. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
      setPhotoDescription("");
      setPhotoTitle("");
      handleToggleUpdatePhotoModal(null);
      queryClient.invalidateQueries(["photos"] as InvalidateQueryFilters);
    }
  }, [
    handleToggleUpdatePhotoModal,
    photoDescription,
    photoTitle,
    photosRepository,
    queryClient,
    selectedPhoto,
    setLoading,
    toast,
  ]);

  return (
    <main className="w-full flex flex-col pt-[4rem]">
      <Header pageTitle="Photos" />
      <div className="w-full max-w-[1080px] flex flex-col mx-auto mt-4 p-4">
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center">
          <div className="flex flex-col  ">
            {user && (
              <div>
                <h1 className="text-lg md:text-2xl font-bold">
                  {user.id === authenticatedUser.id
                    ? "My photos"
                    : `Photos - ${user.name}`}
                </h1>
                <span className="mt-2 text-xs md:text-sm">
                  {photos.length > 0 && photos[0].album
                    ? `Showing photos from ${user.name}´s ${photos[0].album.title} album.`
                    : "This album is empty."}
                </span>
              </div>
            )}
          </div>
          <Button
            className="bg-secondary text-md font-bold text-sm md:text-md mt-3 md:mt-[0] hover:bg-secondary"
            size="lg"
            onClick={handleToggleCreatePhotoModal}
            disabled={userId !== authenticatedUser.id}
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
        ) : photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8  max-h-[75vh] overflow-auto">
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                url={photo.url}
                title={photo.title}
                description={photo.description ?? ""}
                showControls={authenticatedUser.id === userId}
                onDelete={() => handleToggleDeletePhotoModal(photo)}
                onUpdate={() => handleToggleUpdatePhotoModal(photo)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col mt-[4rem]">
            <NoDataFeedback
              message={
                userId === authenticatedUser.id
                  ? "You have no photos created."
                  : "This user has no photos created."
              }
            />
          </div>
        )}
      </div>
      <HandlePhotoModal
        isOpen={createPhotoModal}
        onClose={handleToggleCreatePhotoModal}
        onConfirmAction={handleCreatePhoto}
        photoTitle={photoTitle}
        setPhotoTitle={setPhotoTitle}
        photoDescription={photoDescription}
        setPhotoDescription={setPhotoDescription}
        isLoading={loading}
        urlOptions={publicPhotosURLs}
        selectedUrlOption={selectedPublicURL}
        setSelectedUrlOption={setSelectedPublicURL}
        mode="create"
      />
      <HandlePhotoModal
        isOpen={updatePhotoModal}
        onClose={() => handleToggleUpdatePhotoModal(null)}
        onConfirmAction={handleUpdatePhoto}
        photoTitle={photoTitle}
        setPhotoTitle={setPhotoTitle}
        photoDescription={photoDescription}
        setPhotoDescription={setPhotoDescription}
        isLoading={loading}
        urlOptions={publicPhotosURLs}
        selectedUrlOption={selectedPublicURL}
        setSelectedUrlOption={setSelectedPublicURL}
        mode="update"
      />
      <DeleteModal
        isOpen={deletePhotoModal}
        onClose={() => handleToggleDeletePhotoModal(null)}
        onConfirmAction={() => handleDeletePhotoConfirmation(selectedPhoto!.id)}
        resourceName="photo"
      />
    </main>
  );
};

export default Photos;
