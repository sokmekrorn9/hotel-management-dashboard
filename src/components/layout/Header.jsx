import { useState } from "react";
import {
  LayoutGrid,
  Search,
  Bell,
  Plus,
  ChevronDown,
  Shield,
  UserCheck,
  // eslint-disable-next-line no-unused-vars
  Settings as SettingsIcon,
  UserCog,
  LogOut,
} from "lucide-react";

export function Header({
  setMobileOpen,
  onQuickAction,
  user,
  onLogout,
  setView,
  onEditProfile,
}) {
  const [qaOpen, setQaOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifications = [
    { text: "New reservation received", time: "2m ago" },
    { text: "Room 205 needs cleaning", time: "10m ago" },
    { text: "Guest checkout pending — Room 318", time: "22m ago" },
  ];
  const quickActions = [
    "New Reservation",
    "Walk-in Guest",
    "Check-in",
    "Check-out",
    "Add Guest",
    "Create Invoice",
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 shrink-0"
          onClick={() => setMobileOpen(true)}
        >
          <LayoutGrid size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            Good Morning, {(user?.name || "there").split(" ")[0]}
          </h1>
          <p className="text-xs text-gray-500 truncate hidden sm:block">
            Here's what's happening at your hotel today · Aug 15, 2026
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-64">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search guests, rooms, bookings..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setQaOpen(false);
            }}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-40">
              <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  Notifications
                </p>
                <span className="text-xs text-indigo-600 font-medium">
                  {notifications.length} new
                </span>
              </div>
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className="px-4 py-2.5 hover:bg-gray-50 flex flex-col"
                >
                  <span className="text-sm text-gray-800">{n.text}</span>
                  <span className="text-xs text-gray-400">{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setQaOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3.5 py-2 rounded-lg"
          >
            <Plus size={16} />{" "}
            <span className="hidden sm:inline">Quick Action</span>{" "}
            <ChevronDown size={14} />
          </button>
          {qaOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-40">
              {quickActions.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setQaOpen(false);
                    onQuickAction(a);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setQaOpen(false);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-100"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/64?img=12"}
              className="w-8 h-8 rounded-full object-cover"
              alt=""
            />
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-[11px] text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-40">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-400">{user?.email}</p>
                <span
                  className={`inline-flex items-center gap-1 mt-1.5 text-[11px] font-medium rounded-full px-2 py-0.5 border ${user?.role === "admin" ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-gray-100 text-gray-600 border-gray-200"}`}
                >
                  {user?.role === "admin" && <Shield size={10} />}{" "}
                  {user?.role === "admin" ? "Administrator" : "Staff"}
                </span>
              </div>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                onClick={() => {
                  setProfileOpen(false);
                  onEditProfile();
                }}
              >
                <UserCheck size={14} className="text-gray-400" /> Edit Profile
              </button>
              {user?.role === "admin" && (
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => {
                    setProfileOpen(false);
                    setView("usermanagement");
                  }}
                >
                  <UserCog size={14} className="text-gray-400" /> User
                  Management
                </button>
              )}
              <div className="h-px bg-gray-100 my-1" />
              <button
                className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                onClick={() => {
                  setProfileOpen(false);
                  onLogout();
                }}
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
