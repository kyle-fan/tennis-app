import { type Player, getTier, getNextTier, getTierProgress } from "@/data/players";
import TierBadge from "@/components/TierBadge";
import ProgressReport from "@/components/player/ProgressReport";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  const tier = getTier(percentage);
  const nextTier = getNextTier(tier);
  const progress = getTierProgress(percentage);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <TierBadge tier={tier} size="sm" />
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-400">
        {nextTier ? `${progress}% toward ${nextTier}` : "Top tier — ready for match play"}
      </p>
    </div>
  );
}

export default function PlayerDashboard({ player }: { player: Player }) {
  const playerTier = getTier(player.overallProgress);
  const tierProgress = getTierProgress(player.overallProgress);
  const nextTier = getNextTier(playerTier);

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-900 font-bold text-xl shrink-0">
            {initials(player.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-green-950">{player.name}</h1>
              <TierBadge tier={playerTier} size="md" />
            </div>
            <p className="text-sm text-gray-500 mb-3">Member since {player.memberSince}</p>
            {/* Overall tier progress bar */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500 font-medium">
                  {nextTier ? `Progress toward ${nextTier}` : "Top tier reached"}
                </span>
                <span className="text-xs font-semibold text-green-600">{tierProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{ width: `${tierProgress}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 italic mt-3">&ldquo;{player.tagline}&rdquo;</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Snapshot */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-green-950 mb-5">Skill Snapshot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {player.skills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-green-950 mb-4">Current Focus</h2>
          <div className="border-l-4 border-green-500 pl-4 py-1 bg-green-50 rounded-r-xl pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🎯</span>
              <h3 className="font-semibold text-green-900 text-sm">{player.currentFocus.title}</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{player.currentFocus.coachNote}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">From your coach</p>
            <p className="text-xs text-gray-500">Updated May 1, 2026</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Lessons + Goals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {/* Lessons */}
          <h2 className="text-lg font-bold text-green-950 mb-4">Upcoming Lessons</h2>
          <div className="space-y-3">
            {player.upcomingLessons.map((lesson, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-green-700 leading-tight">
                    {lesson.date.split(" ")[1].replace(",", "")}
                  </span>
                  <span className="text-xs text-green-600 leading-tight">
                    {lesson.date.split(" ")[0].slice(0, 3)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{lesson.date}</p>
                  <p className="text-xs text-gray-500">{lesson.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-gray-100" />

          {/* Goals */}
          <h2 className="text-lg font-bold text-green-950 mb-4">Goals to Work On</h2>
          <ul className="space-y-3">
            {player.upcomingGoals.map((goal, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 leading-snug">{goal}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Milestones */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-green-950 mb-5">Recent Milestones</h2>
          <div className="relative">
            <div className="absolute left-[9px] top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-5">
              {player.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-white ring-2 ring-green-200 shrink-0 mt-0.5 z-10" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 leading-snug">{m.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{m.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Report */}
      <ProgressReport />
    </div>
  );
}
