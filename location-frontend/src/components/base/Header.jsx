const Header = ({ onPartnerOrgsClick }) => {
  return (
    <header className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-[#339cc3] px-4 py-4 lg:flex-row lg:pt-6">
      {/* Logo and Title */}
      <div className="flex items-center gap-6">
        <img
          src="/logo.webp"
          width="150"
          className="max-w-[100px] lg:max-w-full"
        />
        <h1 className="font-display text-center text-2xl font-bold text-white lg:text-4xl">
          the Care Cubby Map
        </h1>
      </div>

      {/* Partner Organizations Button */}
      <button
        onClick={onPartnerOrgsClick}
        className="rounded-lg bg-white px-6 py-3 font-semibold text-[#339cc3] shadow-md transition-colors duration-200 hover:bg-gray-100 hover:shadow-lg"
      >
        Partner Organizations
      </button>
    </header>
  );
};

export default Header;
