import { useState } from "react";
import { Filter } from "lucide-react";
import { StatusBadge } from "../components/common/StatusBadge";
import {
  STATUS_META,
  FLOORS,
  ROOM_TYPES,
  RESERVATIONS,
} from "../data/mockData";

export function RoomsView({
  rooms,
  statusFilter,
  setStatusFilter,
  onRoomClick,
}) {
  const [floorFilter, setFloorFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = rooms.filter(
    (r) =>
      (statusFilter === "All" || r.status === statusFilter) &&
      (floorFilter === "All" || r.floor === Number(floorFilter)) &&
      (typeFilter === "All" || r.type === typeFilter),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Room Management
          </h2>
          <p className="text-sm text-gray-500">
            {filtered.length} of {rooms.length} rooms
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <Filter size={15} className="text-gray-400" />
        <select
          value={floorFilter}
          onChange={(e) => setFloorFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option value="All">All Floors</option>
          {FLOORS.map((f) => (
            <option key={f} value={f}>
              Floor {f}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option value="All">All Types</option>
          {ROOM_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option value="All">All Statuses</option>
          {Object.keys(STATUS_META).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {statusFilter !== "All" && (
          <button
            onClick={() => setStatusFilter("All")}
            className="text-xs text-indigo-600 font-medium"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
        {filtered.map((r) => {
          const meta = STATUS_META[r.status];
          const res = RESERVATIONS.find(
            (x) => x.roomId === r.id && x.status === "Checked In",
          );
          return (
            <button
              key={r.id}
              onClick={() => onRoomClick(r)}
              className="text-left bg-white border rounded-xl p-3.5 hover:shadow-md transition-shadow"
              style={{ borderColor: meta.ring }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-gray-900 text-sm">
                  {r.roomNumber}
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
              </div>
              <p className="text-xs text-gray-500 truncate">{r.type}</p>
              <div className="mt-2">
                <StatusBadge status={r.status} />
              </div>
              {res && (
                <p className="text-xs text-gray-400 mt-2 truncate">
                  {res.guestName}
                </p>
              )}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-10 text-sm">
            No rooms match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
