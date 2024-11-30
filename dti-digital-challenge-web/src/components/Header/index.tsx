interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="w-full h-[4rem] flex items-center bg-gradient-to-r from-[#111111] to-[#3f3f3f] p-4 fixed top-0 left-0">
      <div className="w-[1080px] mx-auto">
        <span className="text-lg md:text-xl text-white font-bold">
          {pageTitle}
        </span>
      </div>
    </header>
  );
};

export default Header;
