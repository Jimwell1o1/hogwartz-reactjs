import { useEffect } from "react";
import { HOUSE_EMBLEMS, HOUSES } from "../constants/houses";

// Format "31-07-1980" → "July 31, 1980"
function formatDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [day, month, year] = parts;
  const date = new Date(`${year}-${month}-${day}`);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function StatBlock({ label, value }) {
  return (
    <div className="bg-yellow-400/[0.04] border border-yellow-400/12 rounded-sm p-4">
      <p className="font-cinzel text-[11px] tracking-[0.25em] text-yellow-400/45 uppercase mb-2">{label}</p>
      <p className="text-[16px] text-stone-100 italic leading-snug">
        {value || <span className="text-yellow-400/20 text-[14px]">Unknown</span>}
      </p>
    </div>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span className={`font-cinzel text-[12px] tracking-wider px-4 py-1.5 border rounded-sm uppercase ${className}`}>
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

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const stats = [
    { label: "Date of Birth",  value: formatDate(char.dateOfBirth) },
    { label: "Year of Birth",  value: char.yearOfBirth ? String(char.yearOfBirth) : null },
    { label: "Ancestry",       value: cap(char.ancestry)   },
    { label: "Eye Colour",     value: cap(char.eyeColour)  },
    { label: "Hair Colour",    value: cap(char.hairColour) },
    { label: "Patronus",       value: cap(char.patronus)   },
    { label: "Actor",          value: char.actor           },
    { label: "Gender",         value: cap(char.gender)     },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="
        relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
        bg-gradient-to-b from-stone-900 to-stone-950
        border border-yellow-400/25 rounded-sm
        shadow-[0_40px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(201,168,76,0.06)]
        animate-modal-in
      ">

        {/* HEADER */}
        <div className="relative flex items-start justify-between gap-4 px-7 pt-7 pb-6 border-b border-yellow-400/12">

          {/* Left: Name + House */}
          <div className="flex-1 pr-2 pt-2">
            <h2 className="font-cinzel-decorative text-3xl sm:text-4xl font-bold text-stone-100 leading-tight mb-3">
              {char.name}
            </h2>
            {char.house && (
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{emblem}</span>
                <span className={`font-cinzel text-sm tracking-[0.2em] uppercase font-semibold ${houseData?.color || "text-yellow-400"}`}>
                  {char.house}
                </span>
              </div>
            )}
          </div>

          {/* Right: Circular profile picture */}
          <div className="flex-shrink-0 mt-1 mr-8">
            <div className="w-52 h-52 rounded-full overflow-hidden border-2 border-yellow-400/35 shadow-[0_0_30px_rgba(201,168,76,0.2)] bg-stone-800">
              {char.image ? (
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl opacity-25">
                  🧙
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-950/80 border border-yellow-400/20 text-yellow-400 text-sm flex items-center justify-center hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="px-7 py-6 space-y-6">

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            {char.alive !== undefined && (
              char.alive
                ? <Badge className="border-emerald-400/40 text-emerald-400/80 bg-emerald-400/5">⬤ Alive</Badge>
                : <Badge className="border-red-400/40 text-red-400/70 bg-red-400/5">⬤ Deceased</Badge>
            )}
            {char.species         && <Badge className="border-yellow-400/25 text-yellow-400/65 bg-yellow-400/5">{cap(char.species)}</Badge>}
            {char.hogwartsStudent && <Badge className="border-blue-400/30 text-blue-400/75 bg-blue-400/5">Student</Badge>}
            {char.hogwartsStaff   && <Badge className="border-purple-400/30 text-purple-400/75 bg-purple-400/5">Staff</Badge>}
            {char.wizard          && <Badge className="border-violet-400/30 text-violet-400/75 bg-violet-400/5">Wizard</Badge>}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

          {/* Character Details */}
          <div>
            <p className="font-cinzel text-[12px] tracking-[0.35em] text-yellow-400/40 uppercase mb-4">Character Details</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stats.map((s) => (
                <StatBlock key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

          {/* Wand */}
          <div>
            <p className="font-cinzel text-[12px] tracking-[0.35em] text-yellow-400/40 uppercase mb-4">Wand</p>
            <div className="flex items-start gap-5 bg-yellow-400/[0.04] border border-yellow-400/12 rounded-sm p-5">
              <span className="text-4xl opacity-60 mt-1">🪄</span>
              <div className="flex-1">
                <p className="font-cinzel text-[11px] tracking-widest text-yellow-400/40 uppercase mb-3">Wand Details</p>
                {hasWand ? (
                  <div className="space-y-2">
                    {wand.wood   && (
                      <div className="flex items-center gap-3">
                        <span className="font-cinzel text-[11px] tracking-wider text-yellow-400/55 uppercase w-16">Wood</span>
                        <span className="text-[16px] text-stone-200 italic">{cap(wand.wood)}</span>
                      </div>
                    )}
                    {wand.core   && (
                      <div className="flex items-center gap-3">
                        <span className="font-cinzel text-[11px] tracking-wider text-yellow-400/55 uppercase w-16">Core</span>
                        <span className="text-[16px] text-stone-200 italic">{cap(wand.core)}</span>
                      </div>
                    )}
                    {wand.length && (
                      <div className="flex items-center gap-3">
                        <span className="font-cinzel text-[11px] tracking-wider text-yellow-400/55 uppercase w-16">Length</span>
                        <span className="text-[16px] text-stone-200 italic">{wand.length}"</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[15px] text-yellow-400/25 italic">Wand details unknown</p>
                )}
              </div>
            </div>
          </div>

          {/* Alternate Names */}
          {char.alternateNames?.length > 0 && (
            <div>
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent mb-6" />
              <p className="font-cinzel text-[12px] tracking-[0.35em] text-yellow-400/40 uppercase mb-4">Also Known As</p>
              <div className="flex flex-wrap gap-2">
                {char.alternateNames.map((n, i) => (
                  <Badge key={i} className="border-yellow-400/20 text-yellow-400/55">{n}</Badge>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}