import { HOUSES, HOUSE_EMBLEMS } from "../constants/houses";

export default function HouseFilter({ activeHouse, onSelect }) {
  return (
    <nav className="relative z-10 flex flex-wrap justify-center gap-2 px-4 py-8">
      {HOUSES.map((house) => {
        const isActive = activeHouse === house.id;
        return (
          <button
            key={house.id}
            onClick={() => onSelect(house.id)}
            className={`
              font-cinzel text-xs tracking-widest uppercase px-5 py-2.5
              border rounded-sm transition-all duration-300
              ${isActive
                ? `${house.color} ${house.border} ${house.activeBg} shadow-lg`
                : "text-yellow-400/50 border-yellow-400/20 hover:text-yellow-200 hover:border-yellow-400/40 hover:bg-yellow-400/5"
              }
            `}
          >
            {house.id !== "all" && (
              <span className="mr-1">{HOUSE_EMBLEMS[house.id]}</span>
            )}
            {house.label}
          </button>
        );
      })}
    </nav>
  );
}
