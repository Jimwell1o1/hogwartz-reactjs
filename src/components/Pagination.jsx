export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build page number list with ellipsis
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
          pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="relative z-10 flex items-center justify-center gap-2 py-10">

    {/* Prev */}
    <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="
        font-cinzel text-[11px] tracking-widest uppercase
        px-4 py-2 border border-yellow-400/20 text-yellow-400/50
        hover:border-yellow-400/50 hover:text-yellow-400/80
        disabled:opacity-25 disabled:cursor-not-allowed
        transition-all rounded-sm
        "
    >
        ← Prev
    </button>

    {/* Page numbers */}
    {getPages().map((p, i) =>
        p === "..." ? (
        <span key={`ellipsis-${i}`} className="font-cinzel text-[11px] text-yellow-400/25 px-1">
            ...
        </span>
        ) : (
        <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`
            font-cinzel text-[11px] tracking-wider w-9 h-9
            border rounded-sm transition-all
            ${page === p
                ? "border-yellow-400/50 bg-yellow-400/15 text-yellow-400"
                : "border-yellow-400/15 text-yellow-400/40 hover:border-yellow-400/40 hover:text-yellow-400/70"
            }
            `}
        >
            {p}
        </button>
        )
    )}

    {/* Next */}
    <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="
        font-cinzel text-[11px] tracking-widest uppercase
        px-4 py-2 border border-yellow-400/20 text-yellow-400/50
        hover:border-yellow-400/50 hover:text-yellow-400/80
        disabled:opacity-25 disabled:cursor-not-allowed
        transition-all rounded-sm
        "
    >
        Next →
    </button>

    </div>
  );
}