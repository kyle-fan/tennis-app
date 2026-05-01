import { type Player, getTier, getNextTier, getTierProgress } from "@/data/players";
import TierBadge from "@/components/TierBadge";

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

export default function CoachPlayers({
  players,
  onSelectPlayer,
}: {
  players: Player[];
  onSelectPlayer: (p: Player) => void;
}) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-950">Your Players</h1>
        <p className="text-gray-500 text-sm mt-1">{players.length} active players</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {players.map((player) => {
          const playerTier = getTier(player.overallProgress);
          const nextTier = getNextTier(playerTier);
          const tierProgress = getTierProgress(player.overallProgress);

          return (
            <div
              key={player.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col"
            >
              {/* Player Header */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${avatarColors[player.name] ?? "bg-gray-100 text-gray-700"}`}
                >
                  {initials(player.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-green-950 mb-1.5">{player.name}</h3>
                  <TierBadge tier={playerTier} size="sm" />
                  <p className="text-xs text-gray-400 mt-1.5">Since {player.memberSince}</p>
                </div>
              </div>

              {/* Overall tier progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium text-gray-600">
                    {nextTier ? `Progress toward ${nextTier}` : "Top tier reached"}
                  </span>
                  <span className="text-xs font-bold text-green-600">{tierProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${tierProgress}%` }}
                  />
                </div>
              </div>

              {/* Skills mini grid with tiers */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {player.skills.map((skill) => {
                  const st = getTier(skill.percentage);
                  return (
                    <div key={skill.name} className="text-center bg-gray-50 rounded-lg py-1.5 px-1">
                      <div className="text-xs text-gray-400 mb-1">{skill.name.slice(0, 4)}</div>
                      <TierBadge tier={st} size="sm" />
                    </div>
                  );
                })}
              </div>

              {/* Current Focus */}
              <div className="bg-green-50 rounded-xl p-3 mb-5 flex-1">
                <p className="text-xs font-semibold text-green-800 mb-1">Current Focus</p>
                <p className="text-xs text-gray-700 leading-relaxed">{player.currentFocus.title}</p>
              </div>

              {/* View Profile Button */}
              <button
                onClick={() => onSelectPlayer(player)}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                View Profile
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
