export default function LoadingSpinner() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center py-32 gap-5">
      <div className="w-16 h-16 rounded-full border-2 border-yellow-400/15 border-t-yellow-400 animate-spin shadow-[0_0_30px_rgba(201,168,76,0.2)]" />
      <p className="font-cinzel text-xs tracking-[0.2em] text-yellow-400/45">
        Loading all the magical spells...
      </p>
    </div>
  );
}
