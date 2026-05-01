"use client";

import { useState } from "react";
import { players, type Player } from "@/data/players";
import Navbar from "@/components/Navbar";
import PlayerDashboard from "@/components/player/PlayerDashboard";
import PlayerPlan from "@/components/player/PlayerPlan";
import CoachDashboard from "@/components/coach/CoachDashboard";
import CoachPlayers from "@/components/coach/CoachPlayers";
import PlayerDetail from "@/components/coach/PlayerDetail";

type View = "coach" | "player";
type PlayerTab = "dashboard" | "plan";
type CoachTab = "dashboard" | "players";

const demoPlayer = players[0];

export default function AppShell() {
  const [view, setView] = useState<View>("player");
  const [playerTab, setPlayerTab] = useState<PlayerTab>("dashboard");
  const [coachTab, setCoachTab] = useState<CoachTab>("dashboard");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleViewChange = (v: View) => {
    setView(v);
    setSelectedPlayer(null);
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar view={view} onViewChange={handleViewChange} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Player View */}
        {view === "player" && (
          <div>
            <TabBar
              tabs={[
                { id: "dashboard", label: "Dashboard" },
                { id: "plan", label: "My Plan" },
              ]}
              active={playerTab}
              onChange={(t) => setPlayerTab(t as PlayerTab)}
            />
            {playerTab === "dashboard" && <PlayerDashboard player={demoPlayer} />}
            {playerTab === "plan" && <PlayerPlan player={demoPlayer} />}
          </div>
        )}

        {/* Coach View */}
        {view === "coach" && !selectedPlayer && (
          <div>
            <TabBar
              tabs={[
                { id: "dashboard", label: "Dashboard" },
                { id: "players", label: "Players" },
              ]}
              active={coachTab}
              onChange={(t) => setCoachTab(t as CoachTab)}
            />
            {coachTab === "dashboard" && <CoachDashboard players={players} />}
            {coachTab === "players" && (
              <CoachPlayers players={players} onSelectPlayer={setSelectedPlayer} />
            )}
          </div>
        )}

        {view === "coach" && selectedPlayer && (
          <PlayerDetail player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />
        )}
      </main>
    </div>
  );
}

type TabItem = { id: string; label: string };

function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
            active === tab.id
              ? "border-green-600 text-green-700"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
