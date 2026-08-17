import { useState } from "react";
import { CreditCard, Printer, Mail, Plus } from "lucide-react";
import { PayBadge } from "../components/common/PayBadge";
import { FOLIOS, currency } from "../data/mockData";

export function BillingView({ reservations, push }) {
  const inHouse = reservations.filter((r) => r.status === "Checked In");
  const [selected, setSelected] = useState(inHouse[0]?.id || null);
  const res = inHouse.find((r) => r.id === selected);
  const folio = res ? FOLIOS[res.id] : null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Billing &amp; Invoicing
        </h2>
        <p className="text-sm text-gray-500">
          Manage guest folios and payments
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm lg:col-span-1">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">
              In-house Folios
            </p>
          </div>
          <div className="max-h-130 overflow-y-auto">
            {inHouse.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 flex items-center justify-between ${selected === r.id ? "bg-indigo-50" : ""}`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {r.guestName}
                  </p>
                  <p className="text-xs text-gray-400">Room {r.roomNumber}</p>
                </div>
                <PayBadge status={r.paymentStatus} />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          {!res || !folio ? (
            <p className="text-sm text-gray-400 text-center py-10">
              Select a guest to view their folio.
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Guest Folio
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {res.guestName} · Room {res.roomNumber}
                  </p>
                </div>
                <PayBadge status={res.paymentStatus} />
              </div>

              <div className="border border-gray-100 rounded-xl divide-y divide-gray-100">
                <div className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-gray-600">Room Charges</span>
                  <span className="text-gray-900 font-medium">
                    {currency(folio.roomCharges)}
                  </span>
                </div>
                {folio.extras.map((e) => (
                  <div
                    key={e.label}
                    className="flex justify-between px-4 py-2.5 text-sm"
                  >
                    <span className="text-gray-600">{e.label}</span>
                    <span className="text-gray-900 font-medium">
                      {currency(e.amount)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="text-gray-900 font-medium">
                    {currency(folio.taxes)}
                  </span>
                </div>
                {folio.discount > 0 && (
                  <div className="flex justify-between px-4 py-2.5 text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-rose-600 font-medium">
                      -{currency(folio.discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between px-4 py-3 text-sm bg-gray-50 font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{currency(folio.total)}</span>
                </div>
                <div className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-gray-600">Paid</span>
                  <span className="text-emerald-600 font-medium">
                    {currency(folio.paid)}
                  </span>
                </div>
                <div className="flex justify-between px-4 py-3 text-sm bg-rose-50 font-semibold">
                  <span className="text-rose-700">Balance Due</span>
                  <span className="text-rose-700">
                    {currency(folio.balance)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <button
                  onClick={() => push("Payment received")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5"
                >
                  <CreditCard size={15} /> Process Payment
                </button>
                <button
                  onClick={() => push("Invoice sent to printer")}
                  className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5"
                >
                  <Printer size={15} /> Print Invoice
                </button>
                <button
                  onClick={() => push("Invoice emailed successfully")}
                  className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5"
                >
                  <Mail size={15} /> Email Invoice
                </button>
                <button
                  onClick={() => push("Charge added to folio")}
                  className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5"
                >
                  <Plus size={15} /> Add Charge
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
