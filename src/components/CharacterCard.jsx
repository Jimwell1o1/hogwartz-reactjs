import { HOUSE_EMBLEMS } from "../constants/houses";

function StatusTag({ alive }) {
  return alive
    ? <span className="text-[9px] font-cinzel tracking-wider px-2 py-0.5 border border-emerald-400/40 text-emerald-400/80 bg-emerald-400/5 rounded-sm uppercase">Alive</span>
    : <span className="text-[9px] font-cinzel tracking-wider px-2 py-0.5 border border-red-400/40 text-red-400/70 bg-red-400/5 rounded-sm uppercase">Deceased</span>;
}

export default function CharacterCard({ char, onClick, animationDelay }) {
  const house   = (char.house || "").toLowerCase();
  const emblem  = HOUSE_EMBLEMS[house] || "✦";
  const role    = char.hogwartsStudent ? "Student"
                : char.hogwartsStaff  ? "Staff"
                : char.species        ? char.species.charAt(0).toUpperCase() + char.species.slice(1)
                : "Wizard";

  return (
    <div
      onClick={() => onClick(char)}
      style={{ animationDelay }}
      className="
        group relative bg-gradient-to-b from-stone-900/90 to-stone-950/95
        border border-yellow-400/10 rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:border-yellow-400/35
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(201,168,76,0.08)]
        animate-fade-in
      "
    >
      {/* Card Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-stone-800 to-stone-950">
        {char.image ? (
          <img
            src={char.image}
            alt={char.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 sepia-[0.2] contrast-105"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-50">🧙</div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/30 to-transparent" />

        {/* House Badge */}
        {char.house && (
          <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-stone-950/80 border border-yellow-400/25 flex items-center justify-center text-sm backdrop-blur-sm">
            {emblem}
          </div>
        )}

        {/* Quick View button */}
        <button className="
          absolute bottom-2.5 right-2.5
          font-cinzel text-[9px] tracking-wider text-yellow-400
          px-2.5 py-1.5 bg-stone-950/85 border border-yellow-400/30 rounded-sm
          opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-250 backdrop-blur-sm
        ">
          QUICK VIEW
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <p className="font-cinzel font-bold text-[17px] text-stone-100 leading-snug mb-1">{char.name}</p>
        <p className="text-[15px] text-yellow-400/45 italic mb-3">{role}</p>
        <div className="flex flex-wrap gap-1">
          {char.alive !== undefined && <StatusTag alive={char.alive} />}
          {char.species && char.species !== "human" && (
            <span className="text-[11px] font-cinzel tracking-wider px-2 py-0.5 border border-yellow-400/20 text-yellow-400/55 bg-yellow-400/4 rounded-sm uppercase">
              {char.species}
            </span>
          )}
          {char.hogwartsStudent && (
            <span className="text-[11px] font-cinzel tracking-wider px-2 py-0.5 border border-blue-400/30 text-blue-400/70 bg-blue-400/5 rounded-sm uppercase">Student</span>
          )}
          {char.hogwartsStaff && (
            <span className="text-[11px] font-cinzel tracking-wider px-2 py-0.5 border border-purple-400/30 text-purple-400/70 bg-purple-400/5 rounded-sm uppercase">Staff</span>
          )}
        </div>
      </div>
    </div>
  );
}
