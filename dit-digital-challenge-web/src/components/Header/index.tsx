interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="w-full h-[4rem] bg-gradient-to-r from-[#111111] to-[#3f3f3f] p-4">
      <span className="text-lg md:text-xl text-white font-bold">
        {pageTitle}
      </span>
    </header>
  );
};

export default Header;
