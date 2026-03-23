import { useState } from "react";
import { useCharacters } from "./hooks/useCharacters";
import Header from "./components/Header";
import HouseFilter from "./components/HouseFilter";
import CharacterCard from "./components/CharacterCard";
import CharacterModal from "./components/CharacterModal";
import LoadingSpinner from "./components/LoadingSpinner";
import { HOUSES } from "./constants/houses";

export default function App() {
  const [activeHouse, setActiveHouse] = useState("gryffindor");
  const [selected, setSelected]       = useState(null);

  const { characters, loading, error, retry } = useCharacters(activeHouse);

  const houseLabel = HOUSES.find((h) => h.id === activeHouse)?.label || "";

  return (
    <div className="min-h-screen text-stone-100 font-fell relative overflow-x-hidden">

      {/* Hogwarts background image */}
      <div
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/hogwarts-bg.jpg')" }}
      />

      {/* Dark overlay to keep text readable */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-stone-950/80 via-stone-950/70 to-stone-950/90" />

      {/* Gold starfield on top */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 15%, rgba(201,168,76,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 45%, rgba(255,255,255,0.1)  0%, transparent 100%),
            radial-gradient(1px 1px at 55% 12%, rgba(201,168,76,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 65%, rgba(255,255,255,0.08) 0%, transparent 100%),
            radial-gradient(1px 1px at 88% 30%, rgba(201,168,76,0.2)  0%, transparent 100%),
            radial-gradient(1px 1px at 42% 82%, rgba(255,255,255,0.1)  0%, transparent 100%)
          `
        }}
      />

      <Header />
      <HouseFilter activeHouse={activeHouse} onSelect={setActiveHouse} />

      {/* Character count */}
      {!loading && !error && (
        <p className="relative z-10 text-center font-cinzel text-[11px] tracking-[0.2em] text-yellow-400/35 pb-6">
          {characters.length} {characters.length === 1 ? "wizard" : "wizards"} found
          {activeHouse !== "all" && ` in ${houseLabel}`}
        </p>
      )}

      {/* States */}
      {loading && <LoadingSpinner />}

      {error && !loading && (
        <div className="relative z-10 flex flex-col items-center justify-center py-20 gap-4 text-center px-4">
          <span className="text-5xl">🦉</span>
          <p className="font-cinzel text-sm text-yellow-400/50">{error}</p>
          <button
            onClick={retry}
            className="font-cinzel text-[11px] tracking-widest uppercase text-yellow-400/60 border border-yellow-400/25 px-5 py-2 hover:bg-yellow-400/8 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Character Grid */}
      {!loading && !error && (
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {characters.map((char, i) => (
              <CharacterCard
                key={char.id || i}
                char={char}
                onClick={setSelected}
                animationDelay={`${i * 0.04}s`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selected && (
        <CharacterModal char={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}