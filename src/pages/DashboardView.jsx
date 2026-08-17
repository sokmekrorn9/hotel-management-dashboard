import { useState, useMemo } from "react";
import {
  BedDouble,
  LogIn,
  LogOut,
  DoorOpen,
  DollarSign,
  UserCheck,
  Star,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { KpiCard } from "../components/common/KpiCard";
import { ResBadge } from "../components/common/ResBadge";
import { PayBadge } from "../components/common/PayBadge";
import {
  STATUS_META,
  OCCUPANCY_TREND,
  FOLIOS,
  currency,
} from "../data/mockData";

function RoomStatusOverview({ rooms, onFilter }) {
  const counts = useMemo(() => {
    const c = {};
    Object.keys(STATUS_META).forEach((s) => (c[s] = 0));
    rooms.forEach((r) => (c[r.status] = (c[r.status] || 0) + 1));
    return c;
  }, [rooms]);
  const total = rooms.length;
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Room Status Overview
      </h3>
      <div className="space-y-3">
        {Object.entries(counts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => onFilter(status)}
            className="w-full group"
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 text-gray-600 group-hover:text-gray-900">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: STATUS_META[status].color }}
                />
                {status}
              </span>
              <span className="font-medium text-gray-900">{count}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(count / total) * 100}%`,
                  backgroundColor: STATUS_META[status].color,
                }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function OccupancyOverview() {
  const [range, setRange] = useState("This Week");
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Occupancy Overview
          </h3>
          <p className="text-xs text-gray-400">Occupancy % and revenue trend</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 text-xs">
          {["Today", "This Week", "This Month", "This Year"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1.5 rounded-md font-medium ${range === r ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={OCCUPANCY_TREND}
            margin={{ left: -20, right: 10, top: 5, bottom: 0 }}
          >
            <defs>
              <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="day"
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
            <Area
              type="monotone"
              dataKey="occupied"
              stroke="#4f46e5"
              strokeWidth={2}
              fill="url(#occGrad)"
              name="Occupancy %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-6 mt-3 pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">Avg. Occupancy</p>
          <p className="text-sm font-semibold text-gray-900">76.7%</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Revenue Summary</p>
          <p className="text-sm font-semibold text-gray-900">
            {currency(OCCUPANCY_TREND.reduce((s, d) => s + d.revenue, 0))}
          </p>
        </div>
      </div>
    </div>
  );
}

function ArrivalsTable({ reservations, onAction }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">
          Today's Arrivals
        </h3>
        <button className="text-xs font-medium text-indigo-600 hover:underline">
          View All Reservations
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
              <th className="px-5 py-2.5 font-medium">Guest</th>
              <th className="px-3 py-2.5 font-medium">Room</th>
              <th className="px-3 py-2.5 font-medium">Arrival</th>
              <th className="px-3 py-2.5 font-medium">Source</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="px-5 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.slice(0, 6).map((r) => (
              <tr
                key={r.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60"
              >
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {r.guestName}
                    </span>
                    {r.vip && (
                      <Star
                        size={12}
                        className="text-amber-500 fill-amber-500"
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{r.id}</p>
                </td>
                <td className="px-3 py-2.5 text-gray-600">{r.roomNumber}</td>
                <td className="px-3 py-2.5 text-gray-600">{r.arrivalTime}</td>
                <td className="px-3 py-2.5 text-gray-600">{r.source}</td>
                <td className="px-3 py-2.5">
                  <ResBadge status={r.status} />
                </td>
                <td className="px-5 py-2.5 text-right">
                  <button
                    onClick={() => onAction(r)}
                    className="text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Check-in
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeparturesTable({ reservations, onAction }) {
  const departing = reservations
    .filter((r) => r.status === "Checked In")
    .slice(0, 6);
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">
          Today's Departures
        </h3>
        <button className="text-xs font-medium text-indigo-600 hover:underline">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
              <th className="px-5 py-2.5 font-medium">Guest</th>
              <th className="px-3 py-2.5 font-medium">Room</th>
              <th className="px-3 py-2.5 font-medium">Balance</th>
              <th className="px-3 py-2.5 font-medium">Payment</th>
              <th className="px-5 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departing.map((r) => {
              const folio = FOLIOS[r.id];
              return (
                <tr
                  key={r.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60"
                >
                  <td className="px-5 py-2.5 font-medium text-gray-900">
                    {r.guestName}
                  </td>
                  <td className="px-3 py-2.5 text-gray-600">{r.roomNumber}</td>
                  <td className="px-3 py-2.5 text-gray-600">
                    {folio ? currency(folio.balance) : "—"}
                  </td>
                  <td className="px-3 py-2.5">
                    <PayBadge status={r.paymentStatus} />
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <button
                      onClick={() => onAction(r)}
                      className="text-xs font-medium text-indigo-600 hover:underline"
                    >
                      Checkout
                    </button>
                  </td>
                </tr>
              );
            })}
            {departing.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-6 text-center text-gray-400 text-sm"
                >
                  No departures scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DashboardView({
  rooms,
  reservations,
  onCheckin,
  onCheckout,
  onFilterRooms,
}) {
  const occupied = rooms.filter((r) => r.status === "Occupied").length;
  const available = rooms.filter((r) => r.status === "Vacant Clean").length;
  const arrivalsToday = reservations.filter((r) =>
    ["Confirmed", "Pending", "Checked In"].includes(r.status),
  ).length;
  const departuresToday = reservations.filter(
    (r) => r.status === "Checked In",
  ).length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          icon={BedDouble}
          label="Today's Occupancy"
          value={`${((occupied / rooms.length) * 100).toFixed(1)}%`}
          sub={`${occupied} of ${rooms.length} rooms`}
          trend={4.2}
          accent="#4f46e5"
        />
        <KpiCard
          icon={LogIn}
          label="Today's Arrivals"
          value={arrivalsToday}
          sub="6 pending, rest confirmed"
          trend={2.1}
          accent="#0891b2"
        />
        <KpiCard
          icon={LogOut}
          label="Today's Departures"
          value={departuresToday}
          sub="4 checked out so far"
          trend={-1.4}
          accent="#7c3aed"
        />
        <KpiCard
          icon={DoorOpen}
          label="Available Rooms"
          value={available}
          sub="6 being cleaned, 2 maintenance"
          accent="#16a34a"
        />
        <KpiCard
          icon={DollarSign}
          label="Today's Revenue"
          value={currency(8450)}
          sub="Room + additional charges"
          trend={6.8}
          accent="#ea580c"
        />
        <KpiCard
          icon={UserCheck}
          label="Active Guests"
          value={occupied + 40}
          sub="12 VIP guests in-house"
          accent="#dc2626"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <OccupancyOverview />
        </div>
        <RoomStatusOverview rooms={rooms} onFilter={onFilterRooms} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ArrivalsTable
          reservations={reservations.filter(
            (r) => r.status !== "Checked In" && r.status !== "Checked Out",
          )}
          onAction={onCheckin}
        />
        <DeparturesTable reservations={reservations} onAction={onCheckout} />
      </div>
    </div>
  );
}
