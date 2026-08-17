import "react";
import {
  DollarSign,
  TrendingUp,
  CalendarCheck,
  Ban,
  Download,
  Globe,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { KpiCard } from "../components/common/KpiCard";
import { OTA_INTEGRATIONS } from "../data/mockData";

export function ReportsView() {
  const revenueData = [
    { name: "Week 1", revenue: 42000 },
    { name: "Week 2", revenue: 48500 },
    { name: "Week 3", revenue: 39800 },
    { name: "Week 4", revenue: 51200 },
  ];
  const sourceData = [
    { name: "Direct", value: 38 },
    { name: "OTA", value: 42 },
    { name: "Phone", value: 10 },
    { name: "Walk-in", value: 10 },
  ];
  const colors = ["#4f46e5", "#0891b2", "#7c3aed", "#ea580c"];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Reports</h2>
        <p className="text-sm text-gray-500">
          Revenue, occupancy, reservation &amp; guest insights
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          icon={DollarSign}
          label="ADR"
          value="$142"
          sub="Average Daily Rate"
          trend={3.4}
          accent="#4f46e5"
        />
        <KpiCard
          icon={TrendingUp}
          label="RevPAR"
          value="$109"
          sub="Revenue per available room"
          trend={5.1}
          accent="#16a34a"
        />
        <KpiCard
          icon={CalendarCheck}
          label="Total Reservations"
          value="342"
          sub="This month"
          trend={8.2}
          accent="#7c3aed"
        />
        <KpiCard
          icon={Ban}
          label="Cancellations"
          value="18"
          sub="5.3% cancellation rate"
          trend={-2.0}
          accent="#dc2626"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Monthly Revenue Report
            </h3>
            <button className="text-xs font-medium text-indigo-600 flex items-center gap-1">
              <Download size={13} /> Export CSV
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ left: -20 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Booking Source Mix
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {sourceData.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {sourceData.map((s, i) => (
              <div
                key={s.name}
                className="flex items-center gap-1.5 text-xs text-gray-600"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors[i] }}
                />{" "}
                {s.name} ({s.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          OTA Integration Status
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {OTA_INTEGRATIONS.map((o) => (
            <div
              key={o.name}
              className="border border-gray-100 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-gray-900 text-sm flex items-center gap-2">
                  <Globe size={14} className="text-gray-400" /> {o.name}
                  <span
                    className={`w-2 h-2 rounded-full ${o.status === "Connected" ? "bg-emerald-500" : "bg-gray-300"}`}
                  />
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Last Sync: {o.lastSync} · {o.reservations} reservations
                </p>
              </div>
              <button className="text-xs font-medium text-indigo-600 flex items-center gap-1">
                <RefreshCw size={12} /> Sync
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
