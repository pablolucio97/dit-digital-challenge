import { MdEmail, MdPerson } from "react-icons/md";
import { useAuthenticationStore } from "../../../../store/auth";
import { getSecondName } from "../../../../utils/getSecondName";

type User = {
  id: number;
  name: string;
  email: string;
};

interface UserCardProps {
  user: User;
  onSeeAlbums: () => void;
  onAuthenticate: () => void;
  isAuthenticated: boolean;
  onSignOut: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onSeeAlbums,
  onAuthenticate,
  isAuthenticated,
  onSignOut,
}) => {
  const { user: authenticatedUser } = useAuthenticationStore();

  const renderAuthenticateButton = () => {
    if (!isAuthenticated) {
      return (
        <button
          className="rounded-md p-2 font-bold flex justify-center items-center min-w-[13rem] md:min-w-[16rem] mr-3 border-2 border-gray-2 text-xs md:text-sm"
          onClick={onAuthenticate}
        >
          Authenticate as {getSecondName(user.name)}
        </button>
      );
    }
    if (user.id === authenticatedUser?.id) {
      return (
        <button
          className="rounded-md p-2 font-bold flex justify-center items-center min-w-[6rem] mr-3 border-2 border-gray-2 text-xs md:text-sm"
          onClick={onSignOut}
        >
          Sign out
        </button>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex items-center p-4 bg-white mb-2 shadow-sm rounded-md">
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full flex flex-col md:flex-row">
          <div className="flex items-center">
            <MdPerson className="h-4 w-4 md:h-6 md:w-6 mr-1" />
            <span className="mr-2 text-xs md:text-sm font-bold">Name:</span>
            <span className="mr-2 text-xs md:text-sm">{user.name}</span>
          </div>
          <div className="flex items-center md:ml-4 my-3 lg:my-[0]">
            <MdEmail className="h-4 w-4 md:h-6 md:w-6 mr-1" />
            <span className="mr-2 text-xs md:text-sm font-bold">Email:</span>
            <span className="mr-2 text-xs md:text-sm">{user.email}</span>
          </div>
        </div>
        <div className="flex">
          {renderAuthenticateButton()}
          <button
            className="bg-primary rounded-md p-2 text-white font-bold flex justify-center items-center min-w-[6rem] text-xs md:text-sm disabled:opacity-60"
            onClick={onSeeAlbums}
            disabled={!isAuthenticated}
          >
            See albums
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
