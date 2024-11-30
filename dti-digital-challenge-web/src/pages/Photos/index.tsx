import Header from "../../components/Header";
import PhotoCard from "./PhotoCard";

const Photos: React.FC = () => {
  const url =
    "https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg";

  const mockedPhotos = [
    {
      id: "1",
      url,
    },
    {
      id: "2",
      url,
    },
    {
      id: "3",
      url,
    },
    {
      id: "4",
      url,
    },
    {
      id: "5",
      url,
    },
    {
      id: "6",
      url,
    },
  ];

  return (
    <main className="w-full flex flex-col pt-[4rem]">
      <Header pageTitle="Photos" />
      <div className="w-full max-w-[1080px] flex flex-col mx-auto mt-4 p-4">
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center">
          <div className="flex flex-col  ">
            <h1 className="text-lg md:text-2xl font-bold">My photos - Pablo</h1>
            <span className="mt-2 text-xs md:text-sm">
              Showing photos from Pablo’s Spring Album
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2  md:grid-cols-3 gap-4 mt-8">
          {mockedPhotos.map((photo) => (
            <PhotoCard key={photo.id} url={photo.url} showControls />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Photos;
