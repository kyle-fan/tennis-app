"use client";

import { useState } from "react";
import { type Player, getTier, getNextTier, getTierProgress } from "@/data/players";
import TierBadge from "@/components/TierBadge";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function PlayerPlan({ player }: { player: Player }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (skill: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(skill)) next.delete(skill);
      else next.add(skill);
      return next;
    });
  };

  const playerTier = getTier(player.overallProgress);
  const foundationsComplete = player.overallProgress >= 20;

  return (
    <div className="space-y-4">
      {/* Foundations Module */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🏗️</span>
              <h2 className="text-lg font-bold text-green-950">Foundations</h2>
              {foundationsComplete ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                  ✓ Completed
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">
                  In Progress
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Core fundamentals covering grip, stance, court awareness, and rally consistency — the
              building blocks of your tennis game. Every skill module builds on what you learn here.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Grip", "Stance", "Court Awareness", "Rally Consistency"].map((item) => (
                <div
                  key={item}
                  className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 text-xs font-medium text-green-800 text-center"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tier ladder legend */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Journey</p>
        <div className="flex items-center gap-1">
          {(["Tier V", "Tier IV", "Tier III", "Tier II", "Tier I"] as const).map((t, i, arr) => {
            const isActive = t === playerTier;
            const isPast =
              arr.indexOf(t) < arr.indexOf(playerTier);
            return (
              <div key={t} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      isActive
                        ? "bg-green-600 text-white border-green-600 ring-2 ring-green-300"
                        : isPast
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-gray-100 text-gray-400 border-gray-200"
                    }`}
                  >
                    {t.replace("Tier ", "")}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${isActive ? "text-green-700" : isPast ? "text-green-500" : "text-gray-300"}`}>
                    {t.replace("Tier ", "T.")}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-1 rounded ${isPast ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Skill Modules */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">
          Skill Modules
        </h3>
        {player.skillModules.map((module) => {
          const isOpen = expanded.has(module.skill);
          const skillTier = getTier(module.percentage);
          const skillNextTier = getNextTier(skillTier);
          const skillProgress = getTierProgress(module.percentage);

          return (
            <div
              key={module.skill}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <button
                onClick={() => toggle(module.skill)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="font-semibold text-gray-900">{module.skill}</span>
                    <TierBadge tier={skillTier} size="sm" />
                    {skillNextTier && (
                      <span className="text-xs text-gray-400">{skillProgress}% to {skillNextTier}</span>
                    )}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${skillProgress}%` }}
                    />
                  </div>
                </div>
                <ChevronIcon open={isOpen} />
              </button>

              {/* Expanded Content */}
              {isOpen && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Current Drills */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Current Drills
                      </h4>
                      <ul className="space-y-2">
                        {module.drills.map((drill, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-sm text-gray-700">{drill.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Coach Note */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        Coach Note
                      </h4>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                        <p className="text-sm text-gray-700 leading-relaxed italic">
                          &ldquo;{module.coachNote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
