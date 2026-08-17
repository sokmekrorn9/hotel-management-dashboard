import "react";
import { useState } from "react";
import { Modal, Field, inputCls } from "../common/Modal";
import { StatusBadge } from "../common/StatusBadge";
import { ResBadge } from "../common/ResBadge";
import {
  STATUS_META,
  ROOM_TYPES,
  SOURCES,
  GUESTS,
  FOLIOS,
  currency,
} from "../../data/mockData";
import { CreditCard, Printer, Wrench, Sparkles } from "lucide-react";

export function CheckinModal({ reservation, onClose, onConfirm }) {
  if (!reservation) return null;
  return (
    <Modal title="Check-in Guest" onClose={onClose} wide>
      <div className="grid sm:grid-cols-2 gap-x-4">
        <Field label="Reservation ID">
          <input
            disabled
            value={reservation.id}
            className={inputCls + " bg-gray-50"}
          />
        </Field>
        <Field label="Guest Name">
          <input
            disabled
            value={reservation.guestName}
            className={inputCls + " bg-gray-50"}
          />
        </Field>
        <Field label="ID / Passport Number">
          <input placeholder="P123456789" className={inputCls} />
        </Field>
        <Field label="Phone">
          <input placeholder="+1 555-0100" className={inputCls} />
        </Field>
        <Field label="Room">
          <input
            disabled
            value={`${reservation.roomNumber} · ${reservation.roomType}`}
            className={inputCls + " bg-gray-50"}
          />
        </Field>
        <Field label="Number of Guests">
          <input
            type="number"
            defaultValue={reservation.guests}
            className={inputCls}
          />
        </Field>
        <Field label="Check-in Date">
          <input
            type="date"
            defaultValue={reservation.checkIn}
            className={inputCls}
          />
        </Field>
        <Field label="Check-out Date">
          <input
            type="date"
            defaultValue={reservation.checkOut}
            className={inputCls}
          />
        </Field>
      </div>
      <Field label="Special Requests">
        <textarea
          rows={2}
          defaultValue={reservation.specialRequests}
          className={inputCls}
        />
      </Field>
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={() => onConfirm(reservation)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          Check In
        </button>
        <button className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg">
          Print Registration
        </button>
        <button className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg">
          Generate Digital Key
        </button>
      </div>
    </Modal>
  );
}

export function CheckoutModal({ reservation, onClose, onConfirm }) {
  if (!reservation) return null;
  const folio = FOLIOS[reservation.id];
  return (
    <Modal title="Guest Checkout" onClose={onClose} wide>
      <div className="mb-4">
        <p className="font-medium text-gray-900">
          {reservation.guestName} · Room {reservation.roomNumber}
        </p>
        <p className="text-xs text-gray-400">{reservation.id}</p>
      </div>
      {folio && (
        <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 mb-4">
          <div className="flex justify-between px-4 py-2.5 text-sm">
            <span className="text-gray-600">Room Charges</span>
            <span>{currency(folio.roomCharges)}</span>
          </div>
          {folio.extras.map((e) => (
            <div
              key={e.label}
              className="flex justify-between px-4 py-2.5 text-sm"
            >
              <span className="text-gray-600">{e.label}</span>
              <span>{currency(e.amount)}</span>
            </div>
          ))}
          <div className="flex justify-between px-4 py-2.5 text-sm">
            <span className="text-gray-600">Taxes</span>
            <span>{currency(folio.taxes)}</span>
          </div>
          <div className="flex justify-between px-4 py-3 text-sm bg-rose-50 font-semibold">
            <span className="text-rose-700">Balance Due</span>
            <span className="text-rose-700">{currency(folio.balance)}</span>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onConfirm(reservation)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          Complete Checkout
        </button>
        <button className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5">
          <CreditCard size={15} /> Process Payment
        </button>
        <button className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5">
          <Printer size={15} /> Print Invoice
        </button>
      </div>
    </Modal>
  );
}

export function WalkInModal({ onClose, onConfirm }) {
  return (
    <Modal title="Walk-in Guest" onClose={onClose} wide>
      <div className="grid sm:grid-cols-2 gap-x-4">
        <Field label="Guest Name">
          <input placeholder="Full name" className={inputCls} />
        </Field>
        <Field label="Phone">
          <input placeholder="+1 555-0100" className={inputCls} />
        </Field>
        <Field label="Email">
          <input placeholder="guest@email.com" className={inputCls} />
        </Field>
        <Field label="ID / Passport">
          <input placeholder="P123456789" className={inputCls} />
        </Field>
        <Field label="Room Type">
          <select className={inputCls}>
            {ROOM_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Number of Guests">
          <input type="number" defaultValue={2} className={inputCls} />
        </Field>
        <Field label="Check-in Date">
          <input type="date" defaultValue="2026-08-15" className={inputCls} />
        </Field>
        <Field label="Check-out Date">
          <input type="date" defaultValue="2026-08-17" className={inputCls} />
        </Field>
        <Field label="Rate">
          <input defaultValue="$120 / night" className={inputCls} />
        </Field>
        <Field label="Payment Method">
          <select className={inputCls}>
            <option>Cash</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>
        </Field>
      </div>
      <button
        onClick={onConfirm}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg mt-2"
      >
        Create Walk-In Reservation
      </button>
    </Modal>
  );
}

export function NewReservationModal({ onClose, onConfirm }) {
  return (
    <Modal title="New Reservation" onClose={onClose} wide>
      <div className="grid sm:grid-cols-2 gap-x-4">
        <Field label="Guest Name">
          <input placeholder="Full name" className={inputCls} />
        </Field>
        <Field label="Phone">
          <input placeholder="+1 555-0100" className={inputCls} />
        </Field>
        <Field label="Check-in">
          <input type="date" defaultValue="2026-08-16" className={inputCls} />
        </Field>
        <Field label="Check-out">
          <input type="date" defaultValue="2026-08-18" className={inputCls} />
        </Field>
        <Field label="Room Type">
          <select className={inputCls}>
            {ROOM_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Guests">
          <input type="number" defaultValue={2} className={inputCls} />
        </Field>
        <Field label="Booking Source">
          <select className={inputCls}>
            {SOURCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Payment">
          <select className={inputCls}>
            <option>Pay at Hotel</option>
            <option>Credit Card</option>
            <option>Online Payment</option>
          </select>
        </Field>
      </div>
      <button
        onClick={onConfirm}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg mt-2"
      >
        Generate Confirmation
      </button>
    </Modal>
  );
}

export function AddGuestModal({ onClose, onConfirm }) {
  return (
    <Modal title="Add Guest" onClose={onClose}>
      <Field label="Full Name">
        <input placeholder="Full name" className={inputCls} />
      </Field>
      <Field label="Email">
        <input placeholder="guest@email.com" className={inputCls} />
      </Field>
      <Field label="Phone">
        <input placeholder="+1 555-0100" className={inputCls} />
      </Field>
      <Field label="Nationality">
        <input placeholder="USA" className={inputCls} />
      </Field>
      <button
        onClick={onConfirm}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg mt-1 w-full"
      >
        Add Guest
      </button>
    </Modal>
  );
}

export function CreateInvoiceModal({ onClose, onConfirm }) {
  return (
    <Modal title="Create Invoice" onClose={onClose}>
      <Field label="Guest">
        <select className={inputCls}>
          {GUESTS.slice(0, 6).map((g) => (
            <option key={g.id}>{g.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Description">
        <input placeholder="Room charges, extras..." className={inputCls} />
      </Field>
      <Field label="Amount">
        <input placeholder="$0.00" className={inputCls} />
      </Field>
      <button
        onClick={onConfirm}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg mt-1 w-full"
      >
        Generate Invoice
      </button>
    </Modal>
  );
}

export function RoomDetailModal({
  room,
  onClose,
  onChangeStatus,
  reservations,
}) {
  if (!room) return null;
  const res = reservations.find(
    (r) => r.roomId === room.id && r.status === "Checked In",
  );
  return (
    <Modal title={`Room ${room.roomNumber}`} onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          {room.type} · Floor {room.floor}
        </span>
        <StatusBadge status={room.status} />
      </div>
      {res ? (
        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
          <p className="text-gray-900 font-medium">{res.guestName}</p>
          <p className="text-gray-500 text-xs">Checkout: {res.checkOut}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-400 mb-4">
          No guest currently assigned.
        </p>
      )}
      <p className="text-xs font-semibold text-gray-500 mb-2">Change Status</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.keys(STATUS_META).map((s) => (
          <button
            key={s}
            onClick={() => onChangeStatus(room, s)}
            className={`text-xs font-medium border rounded-lg px-2 py-2 ${room.status === s ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 hover:bg-gray-50 text-gray-600"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button className="flex-1 border border-gray-200 hover:bg-gray-50 text-sm font-medium px-3 py-2 rounded-lg flex items-center justify-center gap-1.5">
          <Wrench size={14} /> Maintenance
        </button>
        <button className="flex-1 border border-gray-200 hover:bg-gray-50 text-sm font-medium px-3 py-2 rounded-lg flex items-center justify-center gap-1.5">
          <Sparkles size={14} /> Housekeeping
        </button>
      </div>
    </Modal>
  );
}

export function ReservationDetailModal({ reservation, onClose }) {
  if (!reservation) return null;
  return (
    <Modal title="Reservation Details" onClose={onClose} wide>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-gray-900">{reservation.guestName}</p>
          <p className="text-xs text-gray-400">{reservation.id}</p>
        </div>
        <ResBadge status={reservation.status} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Room</p>
          <p className="text-gray-900 font-medium">
            {reservation.roomNumber} · {reservation.roomType}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Guests</p>
          <p className="text-gray-900 font-medium">{reservation.guests}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Check-in</p>
          <p className="text-gray-900 font-medium">{reservation.checkIn}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Check-out</p>
          <p className="text-gray-900 font-medium">{reservation.checkOut}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Rate</p>
          <p className="text-gray-900 font-medium">
            {currency(reservation.rate)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Taxes</p>
          <p className="text-gray-900 font-medium">
            {currency(reservation.taxes)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-gray-900 font-medium">
            {currency(reservation.total)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400">Booking Source</p>
          <p className="text-gray-900 font-medium">{reservation.source}</p>
        </div>
      </div>
      {reservation.specialRequests && (
        <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800">
          Special request: {reservation.specialRequests}
        </div>
      )}
    </Modal>
  );
}

export function EditUserProfileModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "https://i.pravatar.cc/64?img=12",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal title="Edit Profile" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center mb-2">
          <img
            src={formData.avatar}
            className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover"
            alt="Preview"
          />
        </div>
        <Field label="Full Name">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputCls}
            required
          />
        </Field>
        <Field label="Email">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputCls}
            required
          />
        </Field>
        <Field label="Avatar Image URL">
          <input
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className={inputCls}
          />
        </Field>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function LogoutConfirmModal({ onClose, onConfirm }) {
  return (
    <Modal title="Logout" onClose={onClose}>
      <p className="text-sm text-gray-600 mb-5">
        Are you sure you want to logout?
      </p>
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 border border-gray-200 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </Modal>
  );
}
