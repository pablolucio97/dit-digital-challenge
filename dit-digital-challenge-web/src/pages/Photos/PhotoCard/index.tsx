interface PhotoCardProps {
  url: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ url }) => {
  return (
    <img
      className="w-[24rem] aspect-video rounded-md transition ease-in-out"
      src={url}
    />
  );
};

export default PhotoCard;
