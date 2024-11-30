import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Button } from "../../components/ui/button";
import AlbumCard from "./AlbumCard";
import CreateAlbumModal from "./CreateAlbumModal";

const Albums: React.FC = () => {
  const [createAlbumModal, setCreateAlbumModal] = useState(false);

  const mockedAlbums = [
    {
      id: "1",
      title: "Spring",
    },
    {
      id: "2",
      title: "Summer",
    },
    {
      id: "3",
      title: "Chicago Trip",
    },
    {
      id: "4",
      title: "London",
    },
    {
      id: "4",
      title: "Winter",
    },
  ];

  const navigate = useNavigate();

  const handleSeeAlbumPhotos = () => {
    navigate("/photos");
  };

  const handleToggleCreateAlbumModal = () => {
    setCreateAlbumModal(!createAlbumModal);
  };

  return (
    <main className="w-full flex flex-col pt-[4rem]">
      <Header pageTitle="Albums" />
      <div className="w-full max-w-[1080px] flex flex-col mx-auto mt-4 p-4">
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center">
          <div className="flex flex-col  ">
            <h1 className="text-lg md:text-2xl font-bold">My albums - Pablo</h1>
            <span className="mt-2 text-xs md:text-sm">
              Showing Pablo's albums - pablo@gmail.com
            </span>
          </div>
          <Button
            className="bg-secondary text-md font-bold text-sm md:text-md mt-3 md:mt-[0] hover:bg-secondary"
            size="lg"
            onClick={handleToggleCreateAlbumModal}
          >
            <MdAddCircleOutline className="w-[2rem] h-[2rem]" />
            Create album
          </Button>
        </div>
        <div className="grid grid-cols-2  md:grid-cols-3 gap-4 mt-8">
          {mockedAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              onSeeAlbum={handleSeeAlbumPhotos}
              showControls
            />
          ))}
        </div>
      </div>
      <CreateAlbumModal
        isOpen={createAlbumModal}
        onClose={handleToggleCreateAlbumModal}
        onConfirmAction={() => console.log("ok")}
        isLoading={true}
      />
    </main>
  );
};

export default Albums;
