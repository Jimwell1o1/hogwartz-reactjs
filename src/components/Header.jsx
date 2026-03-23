export default function Header() {
  return (
    <header className="relative z-10 border-b border-yellow-400/10 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-8">

        {/* Left: Title & subtitle */}
        <div className="flex flex-col gap-2">
          <h1 className="font-cinzel-decorative text-2xl sm:text-4xl font-bold text-yellow-400 tracking-wide drop-shadow-lg leading-tight">
            Hogwarts Character Portal
          </h1>
          <p className="font-cinzel text-xs tracking-[0.25em] text-yellow-400/50 uppercase">
            Wizarding World · Character Gallery
          </p>
          <p className="font-cinzel text-xs tracking-[0.2em] text-yellow-400/30">
            by Jimwell Rabino
          </p>
        </div>

        {/* Right: Harry Potter logo */}
        <div className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Harry Potter Logo"
            className="h-16 sm:h-32 w-auto object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.3)]"
          />
        </div>

      </div>
    </header>
  );
}