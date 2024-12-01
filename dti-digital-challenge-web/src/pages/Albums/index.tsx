import {
  InvalidateQueryFilters,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import ErrorFeedback from "../../components/ErrorFeedback";
import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import NoDataFeedback from "../../components/NoDataFeedback";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { AlbumDTO } from "../../repositories/dtos/albumsDTO";
import { UserDTO } from "../../repositories/dtos/usersDTO";
import { AlbumsRepositoryImplementation } from "../../repositories/implementation/albumsRepository";
import { UsersRepositoryImplementation } from "../../repositories/implementation/usersRepository";
import { useAuthenticationStore } from "../../store/auth";
import { useLoading } from "../../store/loading";
import AlbumCard from "./components/AlbumCard";
import HandleAlbumModal from "./components/HandleAlbumModal";

const Albums: React.FC = () => {
  const [createAlbumModal, setCreateAlbumModal] = useState(false);
  const [updateAlbumModal, setUpdateAlbumModal] = useState(false);
  const [deleteAlbumModal, setDeleteAlbumModal] = useState(false);
  const [albums, setAlbums] = useState<AlbumDTO[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumDTO | null>(null);
  const [user, setUser] = useState<UserDTO | null>(null);
  const [albumTitle, setAlbumTitle] = useState("");

  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const userId = useMemo(
    () => Number(searchParams.get("userId")),
    [searchParams]
  );

  const { user: authenticatedUser } = useAuthenticationStore();
  const { loading, setLoading } = useLoading();

  const albumsRepository = useMemo(() => {
    return new AlbumsRepositoryImplementation();
  }, []);

  const usersRepository = useMemo(() => {
    return new UsersRepositoryImplementation();
  }, []);

  const getAlbums = useCallback(async () => {
    try {
      const albums = await albumsRepository.listAlbumsByUser(userId);
      setAlbums(albums);
      return albums;
    } catch (error) {
      console.log(error);
    }
  }, [albumsRepository, userId]);

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

  const { isLoading: isAlbumsLoading, error: albumsError } = useQuery({
    queryKey: ["albums", userId],
    queryFn: getAlbums,
  });

  const isLoading = isUserLoading || isAlbumsLoading;
  const error = userError || albumsError;

  const navigate = useNavigate();

  const handleSeeAlbumPhotos = (albumId: number) => {
    navigate(`/photos?userId=${userId}&albumId=${albumId}`);
  };

  const handleToggleCreateAlbumModal = useCallback(() => {
    setCreateAlbumModal(!createAlbumModal);
  }, [createAlbumModal]);

  const handleCreateAlbum = useCallback(async () => {
    try {
      setLoading(true);
      await albumsRepository.createAlbum({ title: albumTitle, userId });
      toast({
        title: "Success",
        description: "Album created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error at trying to create album. Please, try again later.",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setLoading(false);
      queryClient.invalidateQueries(["albums"] as InvalidateQueryFilters);
      handleToggleCreateAlbumModal();
      setAlbumTitle("");
    }
  }, [
    albumTitle,
    albumsRepository,
    handleToggleCreateAlbumModal,
    queryClient,
    setLoading,
    toast,
    userId,
  ]);

  const handleToggleDeleteAlbumModal = useCallback(
    (album: AlbumDTO | null) => {
      setSelectedAlbum(album);
      setDeleteAlbumModal(!deleteAlbumModal);
    },
    [deleteAlbumModal]
  );

  const handleDeleteAlbumConfirmation = useCallback(
    async (albumId: number) => {
      try {
        setLoading(true);
        await albumsRepository.deleteAlbum(albumId);
        toast({
          title: "Success",
          description: "Album deleted successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            "There was an error at trying to delete this album. Please, try again later.",
          variant: "destructive",
        });
        console.log(error);
      } finally {
        setLoading(false);
        queryClient.invalidateQueries(["albums"] as InvalidateQueryFilters);
        handleToggleDeleteAlbumModal(null);
      }
    },
    [
      albumsRepository,
      handleToggleDeleteAlbumModal,
      queryClient,
      setLoading,
      toast,
    ]
  );

  const handleToggleUpdateAlbumModal = useCallback(
    (album: AlbumDTO | null) => {
      setSelectedAlbum(album);
      setUpdateAlbumModal(!updateAlbumModal);
    },
    [updateAlbumModal]
  );

  const handleUpdateAlbumConfirmation = useCallback(async () => {
    try {
      setLoading(true);
      if (selectedAlbum) {
        await albumsRepository.updateAlbum({
          userId,
          id: selectedAlbum?.id,
          title: albumTitle,
        });
      }
      toast({
        title: "Success",
        description: "Album updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error at trying to update this album. Please, try again later.",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setLoading(false);
      queryClient.invalidateQueries(["albums"] as InvalidateQueryFilters);
      handleToggleUpdateAlbumModal(null);
      setAlbumTitle("");
    }
  }, [
    albumTitle,
    albumsRepository,
    handleToggleUpdateAlbumModal,
    queryClient,
    selectedAlbum,
    setLoading,
    toast,
    userId,
  ]);

  return (
    <main className="w-full flex flex-col pt-[4rem] ">
      <Header pageTitle="Albums" />
      <div className="w-full max-w-[1080px] flex flex-col items-center mx-auto mt-4 p-4">
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center">
          <div className="flex flex-col  ">
            {user && (
              <div>
                <h1 className="text-lg md:text-2xl font-bold">
                  {user.id === authenticatedUser.id
                    ? "My albums"
                    : `Albums - ${user.name}`}
                </h1>
                <span className="mt-2 text-xs md:text-sm">
                  {`Showing ${user.name}'s albums - ${user.email}`}
                </span>
              </div>
            )}
          </div>
          <Button
            className="bg-secondary text-md font-bold text-sm md:text-md mt-3 md:mt-[0] hover:bg-secondary"
            size="lg"
            onClick={handleToggleCreateAlbumModal}
            disabled={userId !== authenticatedUser.id}
          >
            <MdAddCircleOutline className="w-[2rem] h-[2rem]" />
            Create album
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
          <div
            className={
              albums.length > 0
                ? "w-full items-center justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-h-[75vh] overflow-auto"
                : "w-full flex items-center justify-center mt-8 max-h-[75vh] overflow-auto"
            }
          >
            {albums.length > 0 ? (
              albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  title={album.title}
                  onSeeAlbum={() => handleSeeAlbumPhotos(album.id)}
                  showControls={userId === authenticatedUser.id}
                  onDelete={() => handleToggleDeleteAlbumModal(album)}
                  onUpdate={() => handleToggleUpdateAlbumModal(album)}
                />
              ))
            ) : (
              <div className="w-full flex flex-col mt-[4rem]">
                <NoDataFeedback
                  message={
                    userId === authenticatedUser.id
                      ? "You have not albums created."
                      : "This user has no albums created."
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
      <HandleAlbumModal
        isOpen={createAlbumModal}
        onClose={handleToggleCreateAlbumModal}
        onConfirmAction={() => handleCreateAlbum()}
        albumTitle={albumTitle}
        isLoading={loading}
        setAlbumTitle={setAlbumTitle}
        mode="create"
      />
      <HandleAlbumModal
        isOpen={updateAlbumModal}
        onClose={() => handleToggleUpdateAlbumModal(null)}
        onConfirmAction={() => handleUpdateAlbumConfirmation()}
        albumTitle={albumTitle}
        isLoading={loading}
        setAlbumTitle={setAlbumTitle}
        mode="update"
      />
      <DeleteModal
        isOpen={deleteAlbumModal}
        onClose={() => handleToggleDeleteAlbumModal(null)}
        onConfirmAction={() => handleDeleteAlbumConfirmation(selectedAlbum!.id)}
        resourceName="album"
      />
    </main>
  );
};

export default Albums;
