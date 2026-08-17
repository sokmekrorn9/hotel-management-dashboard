import "react";
import { STATUS_META } from "../../data/mockData";

export function StatusBadge({ status }) {
  const meta = STATUS_META[status] || {
    color: "#374151",
    bg: "#f3f4f6",
    ring: "#e5e7eb",
  };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border"
      style={{
        color: meta.color,
        backgroundColor: meta.bg,
        borderColor: meta.ring,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      {status}
    </span>
  );
}
