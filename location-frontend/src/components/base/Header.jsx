export default function Header() {
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
    </header>
  );
}
