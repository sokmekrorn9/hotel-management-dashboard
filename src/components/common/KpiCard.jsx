import "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function KpiCard({ icon: Icon, label, value, sub, trend, accent }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: accent + "1a" }}
        >
          <Icon size={16} style={{ color: accent }} />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {trend != null && (
          <span
            className={`text-xs font-medium flex items-center gap-0.5 mb-1 ${trend >= 0 ? "text-emerald-600" : "text-rose-600"}`}
          >
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}
