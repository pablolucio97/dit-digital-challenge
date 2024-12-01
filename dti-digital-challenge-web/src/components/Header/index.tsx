import { MdArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="w-full h-[4rem] flex items-center bg-gradient-to-r from-[#111111] to-[#3f3f3f] p-4 fixed top-0 left-0">
      <div className="w-[1080px] flex items-center mx-auto">
        {location.pathname !== "/" && (
          <button onClick={goBack} className="text-white mx-2">
            <MdArrowBack className="w-5 h-5 md:w-8 md:h-8" />
          </button>
        )}
        <span className="text-lg md:text-xl text-white font-bold">
          {pageTitle}
        </span>
      </div>
    </header>
  );
};

export default Header;
