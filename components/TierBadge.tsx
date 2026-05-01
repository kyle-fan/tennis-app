import { type TierLevel } from "@/data/players";

const tierStyles: Record<TierLevel, string> = {
  "Tier V": "bg-gray-100 text-gray-600 border border-gray-200",
  "Tier IV": "bg-amber-100 text-amber-700 border border-amber-200",
  "Tier III": "bg-lime-100 text-lime-700 border border-lime-200",
  "Tier II": "bg-green-100 text-green-700 border border-green-200",
  "Tier I": "bg-green-600 text-white border border-green-700",
};

export default function TierBadge({
  tier,
  size = "md",
}: {
  tier: TierLevel;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm"
      ? "px-2 py-0.5 text-xs"
      : size === "lg"
        ? "px-4 py-1.5 text-sm"
        : "px-2.5 py-0.5 text-xs";

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizeClass} ${tierStyles[tier]}`}>
      {tier}
    </span>
  );
}
