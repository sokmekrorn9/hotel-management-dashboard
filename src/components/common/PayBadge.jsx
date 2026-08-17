import "react";

export function PayBadge({ status }) {
  const map = {
    Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Partial: "bg-amber-50 text-amber-700 border-amber-200",
    Unpaid: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium border ${map[status]}`}
    >
      {status}
    </span>
  );
}
