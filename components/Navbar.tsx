type View = "coach" | "player";

type NavbarProps = {
  view: View;
  onViewChange: (v: View) => void;
};

export default function Navbar({ view, onViewChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-950 tracking-tight">Tennis Sprouts</span>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewChange("coach")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              view === "coach"
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Coach View
          </button>
          <button
            onClick={() => onViewChange("player")}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              view === "player"
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Player View
          </button>
        </div>
      </div>
    </header>
  );
}
