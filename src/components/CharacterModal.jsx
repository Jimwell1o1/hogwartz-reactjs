import { useEffect } from "react";
import { HOUSE_EMBLEMS, HOUSES } from "../constants/houses";

function StatBlock({ label, value }) {
  return (
    <div className="bg-yellow-400/[0.03] border border-yellow-400/10 rounded-sm p-3">
      <p className="font-cinzel text-[11px] tracking-[0.2em] text-yellow-400/40 uppercase mb-1.5">{label}</p>
      <p className="text-[15px] text-stone-200 italic leading-snug">
        {value || <span className="text-yellow-400/20">Unknown</span>}
      </p>
    </div>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span className={`font-cinzel text-[12px] tracking-wider px-3 py-1 border rounded-sm uppercase ${className}`}>
      {children}
    </span>
  );
}

export default function CharacterModal({ char, onClose }) {
  const house     = (char.house || "").toLowerCase();
  const emblem    = HOUSE_EMBLEMS[house] || "✦";
  const houseData = HOUSES.find((h) => h.id === house);
  const wand      = char.wand || {};
  const hasWand   = wand.wood || wand.core || wand.length;

  const cap = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const stats = [
    { label: "Date of Birth",  value: char.dateOfBirth },
    { label: "Year of Birth",  value: char.yearOfBirth ? String(char.yearOfBirth) : null },
    { label: "Ancestry",       value: cap(char.ancestry) },
    { label: "Eye Colour",     value: cap(char.eyeColour) },
    { label: "Hair Colour",    value: cap(char.hairColour) },
    { label: "Patronus",       value: cap(char.patronus) },
    { label: "Actor",          value: char.actor },
    { label: "Gender",         value: cap(char.gender) },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="
        relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
        bg-gradient-to-b from-stone-900 to-stone-950
        border border-yellow-400/20 rounded-sm
        shadow-[0_40px_80px_rgba(0,0,0,0.8)]
        animate-modal-in
        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-400/20
      ">
        {/* Modal Header — name on left, circular portrait top right */}
        <div className="relative flex items-start justify-between gap-4 px-6 pt-6 pb-5 border-b border-yellow-400/10">

          {/* Left: Name + House */}
          <div className="flex-1 pr-2 pt-1">
            <h2 className="font-cinzel-decorative text-2xl sm:text-3xl font-bold text-stone-100 leading-tight mb-2">
              {char.name}
            </h2>
            {char.house && (
              <div className="flex items-center gap-2">
                <span>{emblem}</span>
                <span className={`font-cinzel text-sm tracking-widest uppercase ${houseData?.color || "text-yellow-400"}`}>
                  {char.house}
                </span>
              </div>
            )}
          </div>

          {/* Right: Circular profile picture */}
          <div className="flex-shrink-0 mt-1 mr-6">
            <div className="w-52 h-52 rounded-full overflow-hidden border-2 border-yellow-400/30 shadow-[0_0_20px_rgba(201,168,76,0.15)] bg-stone-800">
              {char.image ? (
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-top sepia-[0.1]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">
                  🧙
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-stone-950/80 border border-yellow-400/20 text-yellow-400 text-sm flex items-center justify-center hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {char.alive !== undefined && (
              char.alive
                ? <Badge className="border-emerald-400/40 text-emerald-400/80">⬤ Alive</Badge>
                : <Badge className="border-red-400/40 text-red-400/70">⬤ Deceased</Badge>
            )}
            {char.species && <Badge className="border-yellow-400/25 text-yellow-400/60">{cap(char.species)}</Badge>}
            {char.hogwartsStudent && <Badge className="border-blue-400/30 text-blue-400/70">Student</Badge>}
            {char.hogwartsStaff   && <Badge className="border-purple-400/30 text-purple-400/70">Staff</Badge>}
            {char.wizard          && <Badge className="border-violet-400/30 text-violet-400/70">Wizard</Badge>}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent my-5" />

          {/* Character Details */}
          <p className="font-cinzel text-[12px] tracking-[0.3em] text-yellow-400/40 uppercase mb-3">Character Details</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
            {stats.map((s) => (
              <StatBlock key={s.label} label={s.label} value={s.value} />
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent my-5" />

          {/* Wand */}
          <p className="font-cinzel text-[12px] tracking-[0.3em] text-yellow-400/40 uppercase mb-3">Wand</p>
          <div className="flex items-start gap-4 bg-yellow-400/[0.04] border border-yellow-400/12 rounded-sm p-4">
            <span className="text-3xl opacity-60 mt-0.5">🪄</span>
            <div>
              <p className="font-cinzel text-[11px] tracking-widest text-yellow-400/40 uppercase mb-2">Wand Details</p>
              {hasWand ? (
                <div className="text-[15px] text-stone-200 italic space-y-1 leading-relaxed">
                  {wand.wood   && <div><strong className="not-italic text-yellow-400/60">Wood:</strong> {cap(wand.wood)}</div>}
                  {wand.core   && <div><strong className="not-italic text-yellow-400/60">Core:</strong> {cap(wand.core)}</div>}
                  {wand.length && <div><strong className="not-italic text-yellow-400/60">Length:</strong> {wand.length}"</div>}
                </div>
              ) : (
                <p className="text-[15px] text-yellow-400/25 italic">Wand details unknown</p>
              )}
            </div>
          </div>

          {/* Alternate Names */}
          {char.alternateNames?.length > 0 && (
            <>
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent my-5" />
              <p className="font-cinzel text-[12px] tracking-[0.3em] text-yellow-400/40 uppercase mb-3">Also Known As</p>
              <div className="flex flex-wrap gap-2">
                {char.alternateNames.map((n, i) => (
                  <Badge key={i} className="border-yellow-400/20 text-yellow-400/55">{n}</Badge>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}