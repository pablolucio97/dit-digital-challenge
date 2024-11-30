import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { UserDTO } from "../../repositories/dtos/usersDTO";
import { UsersRepositoryImplementation } from "../../repositories/implementation/usersRepository";
import UserCard from "./components/UserCard";

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const navigate = useNavigate();

  const usersRepository = useMemo(() => {
    return new UsersRepositoryImplementation();
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const users = await usersRepository.listUsers();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  }, [usersRepository]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSeeAlbum = () => {
    navigate("/albums");
  };

  return (
    <main className="w-full flex flex-col pt-[4rem]">
      <Header pageTitle="Users" />
      <div className="w-full max-w-[1080px] flex flex-col mx-auto mt-[2rem]">
        <h1 className="text-lg md:text-2xl font-bold ml-4">Users</h1>
        <div className="flex flex-col w-full p-4 my-3 md:max-h-[44rem] overflow-auto">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onSeeAlbums={handleSeeAlbum} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Users;
