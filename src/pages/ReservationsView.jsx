import { useState } from "react";
import { Search, Star, Eye, LogIn, Pencil, Ban } from "lucide-react";
import { ResBadge } from "../components/common/ResBadge";
import { RES_STATUSES, SOURCES, currency } from "../data/mockData";

export function ReservationsView({ reservations, onView, onCheckin }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [q, setQ] = useState("");
  const [viewMode, setViewMode] = useState("List");

  const filtered = reservations.filter(
    (r) =>
      (statusFilter === "All" || r.status === statusFilter) &&
      (sourceFilter === "All" || r.source === sourceFilter) &&
      (q === "" ||
        r.guestName.toLowerCase().includes(q.toLowerCase()) ||
        r.id.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Reservations</h2>
          <p className="text-sm text-gray-500">
            {filtered.length} bookings found
          </p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 text-xs">
          {["List", "Calendar"].map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`px-3 py-1.5 rounded-md font-medium ${viewMode === m ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"}`}
            >
              {m} View
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-45">
          <Search size={15} className="text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guest or reservation ID"
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option>All</option>
          {RES_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option>All</option>
          {SOURCES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {viewMode === "List" ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100 bg-gray-50/60">
                  <th className="px-5 py-3 font-medium">Guest</th>
                  <th className="px-3 py-3 font-medium">Room</th>
                  <th className="px-3 py-3 font-medium">Check-in</th>
                  <th className="px-3 py-3 font-medium">Check-out</th>
                  <th className="px-3 py-3 font-medium">Total</th>
                  <th className="px-3 py-3 font-medium">Source</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60"
                  >
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900 flex items-center gap-1.5">
                        {r.guestName}
                        {r.vip && (
                          <Star
                            size={12}
                            className="text-amber-500 fill-amber-500"
                          />
                        )}
                      </p>
                      <p className="text-xs text-gray-400">{r.id}</p>
                    </td>
                    <td className="px-3 py-3 text-gray-600">
                      {r.roomNumber} · {r.roomType}
                    </td>
                    <td className="px-3 py-3 text-gray-600">{r.checkIn}</td>
                    <td className="px-3 py-3 text-gray-600">{r.checkOut}</td>
                    <td className="px-3 py-3 text-gray-600">
                      {currency(r.total)}
                    </td>
                    <td className="px-3 py-3 text-gray-600">{r.source}</td>
                    <td className="px-3 py-3">
                      <ResBadge status={r.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onView(r)}
                          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500"
                        >
                          <Eye size={14} />
                        </button>
                        {r.status !== "Checked In" &&
                          r.status !== "Checked Out" && (
                            <button
                              onClick={() => onCheckin(r)}
                              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-indigo-600"
                            >
                              <LogIn size={14} />
                            </button>
                          )}
                        <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500">
                          <Pencil size={14} />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-rose-500">
                          <Ban size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-8 text-center text-gray-400"
                    >
                      No reservations match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="grid grid-cols-7 gap-2 text-xs text-gray-400 font-medium mb-2 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => {
              const dayRes = filtered.filter(
                (r) => Number(r.checkIn.slice(-2)) === (i % 30) + 1,
              );
              return (
                <div
                  key={i}
                  className="border border-gray-100 rounded-lg min-h-19 p-1.5 text-xs"
                >
                  <span className="text-gray-400">{(i % 30) + 1}</span>
                  {dayRes.slice(0, 2).map((r) => (
                    <div
                      key={r.id}
                      className="mt-1 truncate bg-indigo-50 text-indigo-700 rounded px-1 py-0.5"
                    >
                      {r.guestName.split(" ")[0]}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
