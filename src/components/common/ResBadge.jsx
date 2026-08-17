import "react";

export function ResBadge({ status }) {
  const map = {
    Confirmed: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    "Checked In": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Checked Out": "bg-gray-100 text-gray-600 border-gray-200",
    Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    "No Show": "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium border ${map[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}
    >
      {status}
    </span>
  );
}
