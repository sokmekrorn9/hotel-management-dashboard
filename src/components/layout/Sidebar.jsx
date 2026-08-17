import "react";
import {
  LayoutGrid,
  CalendarCheck,
  ConciergeBell,
  BedDouble,
  Users,
  Receipt,
  BarChart3,
  Megaphone,
  Settings as SettingsIcon,
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
  Building2,
  LogOut,
  UserCog,
  ShieldCheck,
  Pencil,
} from "lucide-react";
import { canAccessView } from "../../data/mockData";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "reservations", label: "Reservations", icon: CalendarCheck },
  { key: "frontdesk", label: "Front Desk", icon: ConciergeBell },
  { key: "rooms", label: "Rooms", icon: BedDouble },
  { key: "guests", label: "Guests / CRM", icon: Users },
  { key: "billing", label: "Billing & Invoices", icon: Receipt },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "promotions", label: "Promotions", icon: Megaphone },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

const ADMIN_NAV_ITEMS = [
  { key: "usermanagement", label: "User Management", icon: UserCog },
];

export function Sidebar({
  view,
  setView,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  user,
  onLogout,
  onEditProfile,
}) {
  const role = user?.role || "staff";
  const mainItems = NAV_ITEMS.filter(
    (item) => item.key !== "settings" && canAccessView(role, item.key),
  );
  const settingsItem = NAV_ITEMS.find((item) => item.key === "settings");
  const showSettings = settingsItem && canAccessView(role, "settings");
  const adminItems = ADMIN_NAV_ITEMS.filter((item) =>
    canAccessView(role, item.key),
  );

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-50 bg-slate-900 text-slate-200 flex flex-col transition-all duration-200 ${collapsed ? "w-19" : "w-62"} ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-800 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm leading-tight truncate">
                Grand Meridian
              </p>
              <p className="text-slate-400 text-[11px] leading-tight">
                Hotel &amp; Suites
              </p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const active = view === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setView(item.key);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}

          {(showSettings || adminItems.length > 0) && (
            <div className="h-px bg-slate-800 my-2 mx-1" />
          )}

          {showSettings && (
            <button
              onClick={() => {
                setView("settings");
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${view === "settings" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
            >
              <SettingsIcon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">Settings</span>}
            </button>
          )}
          {adminItems.map((item) => {
            const Icon = item.icon;
            const active = view === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setView(item.key);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="px-2 pb-2 space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white">
            <LifeBuoy size={18} className="shrink-0" />
            {!collapsed && <span>Help &amp; Support</span>}
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-rose-300 hover:bg-rose-500/10 hover:text-rose-200"
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* User Sidebar Bar */}
        <div className="border-t border-slate-800 p-3 flex items-center gap-3">
          <button
            onClick={onEditProfile}
            className="group relative shrink-0 focus:outline-none"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/64?img=12"}
              className="w-9 h-9 rounded-full object-cover"
              alt=""
            />
            <span className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Pencil size={12} className="text-white" />
            </span>
          </button>

          {!collapsed && (
            <div
              onClick={onEditProfile}
              className="min-w-0 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <p className="text-white text-sm font-medium truncate">
                {user?.name || "User"}
              </p>
              <p className="text-slate-400 text-xs truncate capitalize flex items-center gap-1">
                {user?.role === "admin" && <ShieldCheck size={11} />}{" "}
                {user?.role || "Staff"}
              </p>
            </div>
          )}

          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden lg:flex w-7 h-7 rounded-md bg-slate-800 hover:bg-slate-700 items-center justify-center text-slate-300 shrink-0"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
      </aside>
    </>
  );
}
