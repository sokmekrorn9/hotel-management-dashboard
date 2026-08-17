import { useState } from "react";
import { Search, Plus, Shield, Eye, Pencil, Ban, Trash2 } from "lucide-react";
import { USERS } from "../data/mockData";
import { Modal, Field, inputCls } from "../components/common/Modal";

function AddUserModal({ onClose, onConfirm }) {
  return (
    <Modal title="Add User" onClose={onClose}>
      <Field label="Full Name">
        <input placeholder="Full name" className={inputCls} />
      </Field>
      <Field label="Email">
        <input placeholder="user@hotel.com" className={inputCls} />
      </Field>
      <Field label="Password">
        <input type="password" placeholder="••••••••" className={inputCls} />
      </Field>
      <Field label="Role">
        <select className={inputCls}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </Field>
      <Field label="Status">
        <select className={inputCls}>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
      </Field>
      <button
        onClick={onConfirm}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg mt-1 w-full"
      >
        Create User
      </button>
    </Modal>
  );
}

export function UserManagementView({ push }) {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState(USERS.map(({ password, ...u }) => u));
  const [q, setQ] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()),
  );

  const toggleStatus = (id) => {
    setUsers((list) =>
      list.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "disabled" : "active" }
          : u,
      ),
    );
    push("User status updated");
  };

  const removeUser = (id) => {
    setUsers((list) => list.filter((u) => u.id !== id));
    push("User removed");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            User Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage admin and staff accounts
          </p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
          <Search size={15} className="text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users..."
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100 bg-gray-50/60">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Role</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60"
                >
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {u.name}
                  </td>
                  <td className="px-3 py-3 text-gray-600">{u.email}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium rounded-full px-2.5 py-1 border ${u.role === "admin" ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-gray-100 text-gray-600 border-gray-200"}`}
                    >
                      {u.role === "admin" && <Shield size={10} />}{" "}
                      {u.role === "admin" ? "Admin" : "Staff"}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 border ${u.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`}
                      />{" "}
                      {u.status === "active" ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500">
                        <Eye size={14} />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500">
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-amber-600"
                        title="Toggle status"
                      >
                        <Ban size={14} />
                      </button>
                      <button
                        onClick={() => removeUser(u.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-rose-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {addOpen && (
        <AddUserModal
          onClose={() => setAddOpen(false)}
          onConfirm={() => {
            setAddOpen(false);
            push("User created successfully");
          }}
        />
      )}
    </div>
  );
}
