import { type Player } from "@/data/players";
import PlayerDashboard from "@/components/player/PlayerDashboard";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

const avatarColors: Record<string, string> = {
  "Alex Chen": "bg-blue-100 text-blue-800",
  "Sofia Martinez": "bg-purple-100 text-purple-800",
  "Tyler Brooks": "bg-amber-100 text-amber-800",
  "Priya Kapoor": "bg-pink-100 text-pink-800",
};

export default function PlayerDetail({
  player,
  onBack,
}: {
  player: Player;
  onBack: () => void;
}) {
  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900 mb-6 transition-colors group"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Players
      </button>

      {/* Coach View Header */}
      <div className="bg-green-950 rounded-2xl p-5 mb-6 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shrink-0 ${avatarColors[player.name] ?? "bg-gray-100 text-gray-700"}`}
        >
          {initials(player.name)}
        </div>
        <div>
          <p className="text-xs font-semibold text-green-300 uppercase tracking-wide mb-0.5">
            Coach View — Full Profile
          </p>
          <h1 className="text-xl font-bold text-white">{player.name}</h1>
        </div>
      </div>

      {/* Re-use player dashboard */}
      <PlayerDashboard player={player} />

      {/* Extra Coach Sections */}
      <div className="space-y-6 mt-6">
        {/* Recent Notes from Player */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-green-950 mb-5">Recent Notes from Player</h2>
          <div className="space-y-4">
            {player.playerNotes.map((note, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                <p className="text-sm text-gray-800 leading-relaxed mb-2">&ldquo;{note.text}&rdquo;</p>
                <p className="text-xs text-gray-400">{note.timestamp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-green-950 mb-5">Recent Activity</h2>
          <div className="space-y-3">
            {player.activityLog.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <div className="flex-1 flex items-center justify-between gap-4">
                  <p className="text-sm text-gray-700">{item.action}</p>
                  <p className="text-xs text-gray-400 shrink-0">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coach Notes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-green-950 mb-2">Coach Notes</h2>
          <p className="text-xs text-gray-500 mb-4">
            Private notes for your reference — not visible to the player.
          </p>
          <textarea
            className="w-full h-32 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Add notes about this player's progress, areas to focus on, or anything else relevant to your coaching..."
          />
          <div className="flex justify-end mt-3">
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
