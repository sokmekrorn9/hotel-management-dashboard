import { useState } from "react";
import { Field, inputCls } from "../components/common/Modal";

export function SettingsView() {
  const [tab, setTab] = useState("Hotel");
  const tabs = ["Hotel", "Rooms", "Payments", "Users", "System"];
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">
          Configure your property and system preferences
        </p>
      </div>
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${tab === t ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-w-2xl">
        {tab === "Hotel" && (
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="Hotel Name">
              <input
                defaultValue="Grand Meridian Hotel & Suites"
                className={inputCls}
              />
            </Field>
            <Field label="Phone">
              <input defaultValue="+1 555-0100" className={inputCls} />
            </Field>
            <Field label="Address">
              <input
                defaultValue="120 Harbor View Rd, San Diego, CA"
                className={inputCls}
              />
            </Field>
            <Field label="Email">
              <input
                defaultValue="frontdesk@grandmeridian.com"
                className={inputCls}
              />
            </Field>
          </div>
        )}
        {tab === "Rooms" && (
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="Room Types">
              <input
                defaultValue="Standard, Deluxe, Suite, Family"
                className={inputCls}
              />
            </Field>
            <Field label="Default Tax Rate (%)">
              <input defaultValue="12" className={inputCls} />
            </Field>
          </div>
        )}
        {tab === "Payments" && (
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="Currency">
              <select className={inputCls}>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </Field>
            <Field label="Accepted Methods">
              <input
                defaultValue="Cash, Card, Bank Transfer, Online"
                className={inputCls}
              />
            </Field>
          </div>
        )}
        {tab === "Users" && (
          <div className="space-y-2">
            {[
              "Admin",
              "Manager",
              "Receptionist",
              "Accountant",
              "Housekeeping",
            ].map((r) => (
              <div
                key={r}
                className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2 text-sm"
              >
                <span className="text-gray-700">{r}</span>
                <span className="text-xs text-gray-400">2 users</span>
              </div>
            ))}
          </div>
        )}
        {tab === "System" && (
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="Language">
              <select className={inputCls}>
                <option>English</option>
                <option>French</option>
              </select>
            </Field>
            <Field label="Timezone">
              <select className={inputCls}>
                <option>GMT+7 Phnom Penh</option>
                <option>GMT-8 Pacific</option>
              </select>
            </Field>
            <Field label="Date Format">
              <select className={inputCls}>
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
              </select>
            </Field>
          </div>
        )}
        <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
