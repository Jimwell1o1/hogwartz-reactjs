const SORT_OPTIONS = [
  { value: "name-asc",    label: "Name A–Z"      },
  { value: "name-desc",   label: "Name Z–A"      },
  { value: "alive-first", label: "Alive First"   },
  { value: "dead-first",  label: "Deceased First" },
  { value: "student",     label: "Students First" },
  { value: "staff",       label: "Staff First"   },
];

export default function SortControls({ sortBy, onSort, total, page, perPage }) {
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end   = Math.min(page * perPage, total);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

    {/* Count */}
    <p className="font-cinzel text-[11px] tracking-[0.2em] text-yellow-400/35">
        {total === 0 ? "No wizards found" : `Showing ${start}–${end} of ${total} wizards`}
    </p>

    {/* Sort dropdown */}
    <div className="flex items-center gap-3">
        <span className="font-cinzel text-[10px] tracking-widest text-yellow-400/35 uppercase">Sort by</span>
        <select
        value={sortBy}
        onChange={(e) => onSort(e.target.value)}
        className="
            bg-stone-950/80 border border-yellow-400/20 text-yellow-400/70
            font-cinzel text-[11px] tracking-wider
            px-3 py-1.5 rounded-sm
            focus:outline-none focus:border-yellow-400/50
            cursor-pointer transition-colors
        "
        >
        {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-stone-950">
            {opt.label}
            </option>
        ))}
        </select>
    </div>

    </div>
  );
}