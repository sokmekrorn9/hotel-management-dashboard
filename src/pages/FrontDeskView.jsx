import { useState } from "react";
import {
  PlusCircle,
  LogIn,
  UserCheck,
  LogOut,
  ClipboardList,
  DoorOpen,
  Star,
  Search,
} from "lucide-react";
import { KpiCard } from "../components/common/KpiCard";
import { Field, inputCls } from "../components/common/Modal";
import { ROOM_TYPES, currency } from "../data/mockData";

function AvailabilitySearch({ rooms }) {
  const [searched, setSearched] = useState(false);
  const byType = ROOM_TYPES.map((type) => {
    const list = rooms.filter(
      (r) => r.type === type && r.status === "Vacant Clean",
    );
    return {
      type,
      count: list.length,
      price: rooms.find((r) => r.type === type)?.price,
    };
  });
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Room Availability Search
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
        <Field label="Check-in">
          <input type="date" defaultValue="2026-08-15" className={inputCls} />
        </Field>
        <Field label="Check-out">
          <input type="date" defaultValue="2026-08-17" className={inputCls} />
        </Field>
        <Field label="Adults">
          <input type="number" defaultValue={2} min={1} className={inputCls} />
        </Field>
        <Field label="Children">
          <input type="number" defaultValue={0} min={0} className={inputCls} />
        </Field>
        <Field label="Room Type">
          <select className={inputCls}>
            <option>Any</option>
            {ROOM_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Rooms">
          <input type="number" defaultValue={1} min={1} className={inputCls} />
        </Field>
      </div>
      <button
        onClick={() => setSearched(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2"
      >
        <Search size={15} /> Search Availability
      </button>

      {searched && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {byType.map((t) => (
            <div
              key={t.type}
              className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <p className="font-medium text-gray-900 text-sm">{t.type}</p>
              <p className="text-xs text-gray-400 mt-0.5">2 Guests</p>
              <p className="text-xs text-emerald-600 font-medium mt-2">
                Available: {t.count} rooms
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {currency(t.price)}{" "}
                <span className="text-xs font-normal text-gray-400">
                  / night
                </span>
              </p>
              <button className="mt-3 w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-medium py-2 rounded-lg">
                Select Room
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FrontDeskView({ reservations, rooms, onWalkIn }) {
  const expected = reservations.filter((r) =>
    ["Confirmed", "Pending"].includes(r.status),
  );
  const checkedIn = reservations.filter((r) => r.status === "Checked In");
  const summary = [
    {
      label: "Expected Arrivals",
      value: expected.length,
      icon: LogIn,
      accent: "#4f46e5",
    },
    {
      label: "Checked In",
      value: checkedIn.length,
      icon: UserCheck,
      accent: "#16a34a",
    },
    {
      label: "Expected Departures",
      value: checkedIn.length,
      icon: LogOut,
      accent: "#7c3aed",
    },
    {
      label: "Pending Checkouts",
      value: Math.max(checkedIn.length - 2, 0),
      icon: ClipboardList,
      accent: "#ea580c",
    },
    { label: "Walk-ins Today", value: 5, icon: DoorOpen, accent: "#0891b2" },
    {
      label: "VIP Guests",
      value: reservations.filter((r) => r.vip).length,
      icon: Star,
      accent: "#dc2626",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Front Desk</h2>
          <p className="text-sm text-gray-500">Reception control center</p>
        </div>
        <button
          onClick={onWalkIn}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2"
        >
          <PlusCircle size={16} /> New Walk-in
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {summary.map((s) => (
          <KpiCard
            key={s.label}
            icon={s.icon}
            label={s.label}
            value={s.value}
            sub="Today"
            accent={s.accent}
          />
        ))}
      </div>

      <AvailabilitySearch rooms={rooms} />
    </div>
  );
}
