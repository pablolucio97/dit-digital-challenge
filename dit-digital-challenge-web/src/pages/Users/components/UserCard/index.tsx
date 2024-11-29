import { MdEmail, MdPerson } from "react-icons/md";

type User = {
  name: string;
  email: string;
};

interface UserCardProps {
  user: User;
  onSeeAlbums: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSeeAlbums }) => {
  return (
    <div className="w-full flex items-center p-4 bg-white mb-2 shadow-sm rounded-md">
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full flex flex-col md:flex-row">
          <div className="flex items-center">
            <MdPerson className="h-4 w-4 md:h-6 md:w-6 mr-2" />
            <span className="mr-2 text-xs md:text-sm font-bold">Name:</span>
            <span className="mr-2 text-xs md:text-sm">{user.name}</span>
          </div>
          <div className="flex items-center md:ml-4 my-3 md:my-[0]">
            <MdEmail className="h-4 w-4 md:h-6 md:w-6 mr-2" />
            <span className="mr-2 text-xs md:text-sm font-bold">Email:</span>
            <span className="mr-2 text-xs md:text-sm">{user.email}</span>
          </div>
        </div>
        <button
          className="bg-primary rounded-md p-2 text-white font-bold flex justify-center min-w-[8rem]"
          onClick={onSeeAlbums}
        >
          See albums
        </button>
      </div>
    </div>
  );
};

export default UserCard;
