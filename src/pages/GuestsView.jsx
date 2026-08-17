import { useState } from "react";
import {
  Users,
  UserCheck,
  Star,
  Sparkles,
  TrendingUp,
  Search,
} from "lucide-react";
import { KpiCard } from "../components/common/KpiCard";
import { Modal } from "../components/common/Modal";
import { currency } from "../data/mockData";

export function GuestsView({ guests, onSelect }) {
  const [q, setQ] = useState("");
  const [segment, setSegment] = useState("All");
  const filtered = guests.filter(
    (g) =>
      (segment === "All" || g.segment === segment) &&
      (q === "" || g.name.toLowerCase().includes(q.toLowerCase())),
  );
  const segments = ["New", "Returning", "VIP", "Corporate", "Family"];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Guests &amp; CRM
        </h2>
        <p className="text-sm text-gray-500">{guests.length} guest profiles</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiCard
          icon={Users}
          label="New Guests"
          value={guests.filter((g) => g.segment === "New").length}
          sub="This month"
          accent="#4f46e5"
        />
        <KpiCard
          icon={UserCheck}
          label="Returning"
          value={guests.filter((g) => g.segment === "Returning").length}
          sub="Repeat visitors"
          accent="#16a34a"
        />
        <KpiCard
          icon={Star}
          label="VIP Guests"
          value={guests.filter((g) => g.segment === "VIP").length}
          sub="Priority service"
          accent="#dc2626"
        />
        <KpiCard
          icon={Sparkles}
          label="Loyalty Members"
          value={guests.length}
          sub="Active in program"
          accent="#7c3aed"
        />
        <KpiCard
          icon={TrendingUp}
          label="High-value Guests"
          value={guests.filter((g) => g.totalSpend > 2000).length}
          sub="Top spenders"
          accent="#ea580c"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 flex-1 min-w-45">
          <Search size={15} className="text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guest by name"
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>
        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option value="All">All Segments</option>
          {segments.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((g) => (
          <button
            key={g.id}
            onClick={() => onSelect(g)}
            className="text-left bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/64?img=${g.id + 20}`}
                className="w-11 h-11 rounded-full"
                alt=""
              />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">
                  {g.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{g.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-1">
                {g.loyaltyTier} · {g.loyaltyPoints} pts
              </span>
              <span className="text-xs text-gray-400">
                {g.totalStays} stays
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function GuestProfileModal({ guest, onClose }) {
  if (!guest) return null;
  return (
    <Modal title="Guest Profile" onClose={onClose} wide>
      <div className="flex items-center gap-4 mb-5">
        <img
          src={`https://i.pravatar.cc/96?img=${guest.id + 20}`}
          className="w-16 h-16 rounded-full"
          alt=""
        />
        <div>
          <p className="text-lg font-semibold text-gray-900">{guest.name}</p>
          <p className="text-sm text-gray-500">
            {guest.email} · {guest.phone}
          </p>
          <span className="inline-block mt-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-1">
            {guest.loyaltyTier} Member · {guest.loyaltyPoints} Points
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">
            Personal Information
          </p>
          <p className="text-sm text-gray-700">
            Nationality: {guest.nationality}
          </p>
          <p className="text-sm text-gray-700">ID/Passport: {guest.idNumber}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">Loyalty</p>
          <p className="text-sm text-gray-700">
            Total stays: {guest.totalStays}
          </p>
          <p className="text-sm text-gray-700">
            Total spend: {currency(guest.totalSpend)}
          </p>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 mb-2">Preferences</p>
        <div className="flex flex-wrap gap-2">
          {guest.preferences.map((p) => (
            <span
              key={p}
              className="text-xs bg-indigo-50 text-indigo-700 rounded-full px-2.5 py-1"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 mb-2">Stay History</p>
        <div className="space-y-2">
          {guest.stayHistory.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm"
            >
              <span className="text-gray-700">
                {s.room} · {s.checkIn} → {s.checkOut}
              </span>
              <span className="text-gray-500">
                {currency(s.amount)} · {s.source}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-5">
        <p className="text-xs font-semibold text-indigo-700 mb-1">
          Suggested Promotion
        </p>
        <p className="text-sm text-indigo-900">
          20% Executive Suite Upgrade based on stay history and preferences.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg">
          Add Points
        </button>
        <button className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg">
          Redeem Reward
        </button>
        <button className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg">
          Edit Profile
        </button>
      </div>
    </Modal>
  );
}
