import { type Player } from "@/data/players";

const upcomingWeekLessons = [
  { player: "Alex Chen", date: "May 3", time: "10:00 AM", focus: "Serve mechanics & toss drill" },
  { player: "Tyler Brooks", date: "May 3", time: "11:00 AM", focus: "Eastern grip forehand + rally basics" },
  { player: "Priya Kapoor", date: "May 4", time: "6:00 PM", focus: "Backhand drive — leg drive & rotation" },
  { player: "Sofia Martinez", date: "May 5", time: "8:00 AM", focus: "First volley + put-away combos" },
  { player: "Priya Kapoor", date: "May 6", time: "6:00 PM", focus: "Forehand + backhand groundstroke patterns" },
  { player: "Alex Chen", date: "May 7", time: "4:00 PM", focus: "Backhand cross-court patterns" },
];

const recentActivity = [
  { player: "Alex Chen", action: "completed serve toss isolation drill", timestamp: "2 days ago" },
  { player: "Sofia Martinez", action: "completed first-volley placement drill", timestamp: "3 days ago" },
  { player: "Priya Kapoor", action: "completed leg drive backhand drill", timestamp: "3 days ago" },
  { player: "Tyler Brooks", action: "logged a practice note", timestamp: "3 days ago" },
  { player: "Sofia Martinez", action: "reviewed tournament match footage", timestamp: "5 days ago" },
];

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-green-950">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function playerInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

const playerColors: Record<string, string> = {
  "Alex Chen": "bg-blue-100 text-blue-800",
  "Sofia Martinez": "bg-purple-100 text-purple-800",
  "Tyler Brooks": "bg-amber-100 text-amber-800",
  "Priya Kapoor": "bg-pink-100 text-pink-800",
};

export default function CoachDashboard({ players }: { players: Player[] }) {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-green-950">Good morning, Coach</h1>
        <p className="text-gray-500 text-sm mt-1">Thursday, May 1, 2026 · 7 lessons scheduled this week</p>
      </div>

      {/* Stat Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Players" value={String(players.length)} icon="👥" />
        <StatCard label="Lessons This Week" value="6" icon="📅" />
        <StatCard label="Hours Coached This Month" value="18h" icon="⏱️" />
        <StatCard label="Players with Recent Activity" value="4" icon="🔥" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-green-950 mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${playerColors[item.player] ?? "bg-gray-100 text-gray-700"}`}
                >
                  {playerInitials(item.player)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">{item.player}</span>{" "}
                    <span className="text-gray-600">{item.action}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-green-950 mb-5">This Week&apos;s Schedule</h2>
          <div className="space-y-3">
            {upcomingWeekLessons.map((lesson, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="text-center shrink-0 w-10">
                  <p className="text-xs font-bold text-green-700">{lesson.date.split(" ")[0]}</p>
                  <p className="text-sm font-bold text-green-950">{lesson.date.split(" ")[1]}</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{lesson.player}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {lesson.time} · {lesson.focus}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${playerColors[lesson.player] ?? "bg-gray-100"}`}
                >
                  {playerInitials(lesson.player)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
