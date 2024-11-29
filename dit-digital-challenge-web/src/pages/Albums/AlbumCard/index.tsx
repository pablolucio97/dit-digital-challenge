interface AlbumCardProps {
  title: string;
  onSeeAlbum: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ title, onSeeAlbum }) => {
  return (
    <div
      className="w-full min-h-[8rem] flex justify-center items-center p-4  bg-gradient-to-r from-primary to-[#6BE0EF] mb-2 rounded-md cursor-pointer hover:scale-[1.05] transition ease-in-out"
      onClick={onSeeAlbum}
    >
      <span className="mr-2 text-xl md:text-2xl font-bold">{title}</span>
    </div>
  );
};

export default AlbumCard;
