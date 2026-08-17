export const ROOM_TYPES = [
  "Standard Queen",
  "Deluxe King",
  "Executive Suite",
  "Family Room",
];
export const FLOORS = [1, 2, 3, 4, 5];

export const STATUS_META = {
  "Vacant Clean": { color: "#16a34a", bg: "#f0fdf4", ring: "#bbf7d0" },
  "Vacant Dirty": { color: "#ea580c", bg: "#fff7ed", ring: "#fed7aa" },
  Occupied: { color: "#2563eb", bg: "#eff6ff", ring: "#bfdbfe" },
  Reserved: { color: "#7c3aed", bg: "#f5f3ff", ring: "#ddd6fe" },
  Cleaning: { color: "#0891b2", bg: "#ecfeff", ring: "#a5f3fc" },
  Maintenance: { color: "#dc2626", bg: "#fef2f2", ring: "#fecaca" },
};

// src/data/mockData.js

export function currency(amount) {
  // Convert value to number or default to 0 if undefined/null/NaN
  const num = Number(amount) || 0;

  return `$${num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function makeRooms() {
  const rooms = [];
  const statuses = [
    "Vacant Clean",
    "Occupied",
    "Reserved",
    "Vacant Dirty",
    "Maintenance",
  ];
  const weights = [0.28, 0.42, 0.14, 0.11, 0.05];
  let id = 1;
  FLOORS.forEach((floor) => {
    for (let i = 1; i <= 10; i++) {
      const roomNumber = `${floor}${String(i).padStart(2, "0")}`;
      const type = ROOM_TYPES[(floor + i) % ROOM_TYPES.length];
      const r = Math.random();
      let acc = 0,
        status = statuses[0];
      for (let k = 0; k < statuses.length; k++) {
        acc += weights[k];
        if (r <= acc) {
          status = statuses[k];
          break;
        }
      }
      const price = {
        "Standard Queen": 89,
        "Deluxe King": 120,
        "Executive Suite": 250,
        "Family Room": 165,
      }[type];
      rooms.push({
        id: id++,
        roomNumber,
        floor,
        type,
        price,
        status,
        guestId: status === "Occupied" ? null : null,
      });
    }
  });
  return rooms;
}

export let ROOMS = makeRooms();

const GUEST_NAMES = [
  "John Smith",
  "Sarah Johnson",
  "Michael Chen",
  "Emma Wilson",
  "David Lee",
  "Olivia Brown",
  "James Anderson",
  "Sophia Martinez",
  "Daniel Kim",
  "Ava Thompson",
  "Liam Davis",
  "Isabella Garcia",
];

function makeGuests() {
  return GUEST_NAMES.map((name, i) => ({
    id: i + 1,
    name,
    email: name.toLowerCase().replace(/\s+/g, ".") + "@mail.com",
    phone: `+1 555-01${String(20 + i).padStart(2, "0")}`,
    nationality: ["USA", "Canada", "UK", "France", "Singapore", "UAE"][i % 6],
    idNumber: `P${100000 + i * 37}`,
    loyaltyTier: ["Silver", "Gold", "Platinum", "Silver", "Gold"][i % 5],
    loyaltyPoints: 500 + i * 430,
    totalStays: 1 + (i % 9),
    totalSpend: 800 + i * 275,
    preferences: [
      ["Non-smoking room", "King bed"],
      ["High floor", "Late checkout"],
      ["Favorite food: Seafood", "Extra pillows"],
      ["Quiet room"],
      ["Early check-in"],
    ][i % 5],
    segment: ["Returning", "VIP", "New", "Corporate", "Family"][i % 5],
    stayHistory: [
      {
        hotel: "Grand Meridian",
        room: "204",
        checkIn: "2026-03-12",
        checkOut: "2026-03-15",
        amount: 480,
        source: "Direct",
      },
      {
        hotel: "Grand Meridian",
        room: "512",
        checkIn: "2025-11-02",
        checkOut: "2025-11-05",
        amount: 750,
        source: "Booking.com",
      },
    ],
  }));
}
export let GUESTS = makeGuests();

export const SOURCES = [
  "Direct",
  "Website",
  "Expedia",
  "Booking.com",
  "Phone",
  "Walk-in",
  "Travel Agent",
];
export const RES_STATUSES = [
  "Confirmed",
  "Pending",
  "Checked In",
  "Checked Out",
  "Cancelled",
  "No Show",
];

function makeReservations() {
  const list = [];
  const availableRooms = ROOMS.filter((r) =>
    ["Occupied", "Reserved", "Vacant Clean"].includes(r.status),
  );
  for (let i = 0; i < 16; i++) {
    const guest = GUESTS[i % GUESTS.length];
    const room = availableRooms[i % availableRooms.length];
    const nights = 1 + (i % 4);
    const status =
      room.status === "Occupied"
        ? "Checked In"
        : room.status === "Reserved"
          ? "Confirmed"
          : RES_STATUSES[i % RES_STATUSES.length];
    const rate = room.price;
    const taxes = Math.round(rate * nights * 0.12);
    const total = rate * nights + taxes;
    list.push({
      id: `RES-${2400 + i}`,
      guestId: guest.id,
      guestName: guest.name,
      roomId: room.id,
      roomNumber: room.roomNumber,
      roomType: room.type,
      checkIn: `2026-08-${String(14 + (i % 4)).padStart(2, "0")}`,
      checkOut: `2026-08-${String(15 + (i % 4) + nights).padStart(2, "0")}`,
      guests: 1 + (i % 3),
      rate,
      taxes,
      total,
      status,
      paymentStatus: ["Paid", "Partial", "Unpaid"][i % 3],
      source: SOURCES[i % SOURCES.length],
      arrivalTime: `${10 + (i % 8)}:00 ${i % 2 === 0 ? "AM" : "PM"}`,
      specialRequests: i % 4 === 0 ? "Late checkout requested" : "",
      vip: i % 5 === 0,
    });
  }
  return list;
}
export let RESERVATIONS = makeReservations();

function makeFolios() {
  const folios = {};
  RESERVATIONS.filter((r) => r.status === "Checked In").forEach((res) => {
    const room = res.rate;
    const extras = [
      { label: "Room Service", amount: 45 },
      { label: "Laundry", amount: 20 },
      { label: "Minibar", amount: 15 },
    ].filter(() => Math.random() > 0.4);
    const extraTotal = extras.reduce((s, e) => s + e.amount, 0);
    const taxes = Math.round((room + extraTotal) * 0.12);
    const discount = Math.random() > 0.7 ? 20 : 0;
    const total = room + extraTotal + taxes - discount;
    const paid =
      res.paymentStatus === "Paid"
        ? total
        : res.paymentStatus === "Partial"
          ? Math.round(total * 0.6)
          : 0;
    folios[res.id] = {
      roomCharges: room,
      extras,
      taxes,
      discount,
      total,
      paid,
      balance: total - paid,
    };
  });
  return folios;
}
export let FOLIOS = makeFolios();

export const OCCUPANCY_TREND = [
  { day: "Mon", occupied: 68, revenue: 6200 },
  { day: "Tue", occupied: 72, revenue: 6800 },
  { day: "Wed", occupied: 75, revenue: 7100 },
  { day: "Thu", occupied: 71, revenue: 6900 },
  { day: "Fri", occupied: 82, revenue: 8600 },
  { day: "Sat", occupied: 91, revenue: 9800 },
  { day: "Sun", occupied: 78, revenue: 8450 },
];

export const OTA_INTEGRATIONS = [
  {
    name: "Booking.com",
    status: "Connected",
    lastSync: "2 minutes ago",
    reservations: 128,
  },
  {
    name: "Expedia",
    status: "Connected",
    lastSync: "14 minutes ago",
    reservations: 76,
  },
  {
    name: "Agoda",
    status: "Disconnected",
    lastSync: "3 days ago",
    reservations: 12,
  },
  {
    name: "Direct Website",
    status: "Connected",
    lastSync: "Just now",
    reservations: 204,
  },
];
/* ============================== AUTH & USER DATA ============================== */

export const USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@hotel.com",
    password: "admin123",
    role: "admin",
    status: "active",
    avatar: "https://i.pravatar.cc/64?img=12",
  },
  {
    id: 2,
    name: "Hotel Staff",
    email: "staff@hotel.com",
    password: "staff123",
    role: "staff",
    status: "active",
    avatar: "https://i.pravatar.cc/64?img=33",
  },
  {
    id: 3,
    name: "John Reyes",
    email: "john@hotel.com",
    password: "staff123",
    role: "staff",
    status: "active",
    avatar: "https://i.pravatar.cc/64?img=11",
  },
  {
    id: 4,
    name: "Sarah Kim",
    email: "sarah@hotel.com",
    password: "staff123",
    role: "staff",
    status: "disabled",
    avatar: "https://i.pravatar.cc/64?img=5",
  },
];

export const ROLE_PERMISSIONS = {
  admin: {
    views: [
      "dashboard",
      "reservations",
      "frontdesk",
      "rooms",
      "guests",
      "billing",
      "reports",
      "promotions",
      "settings",
      "usermanagement",
    ],
    can: [
      "manageSystemSettings",
      "manageHotelSettings",
      "manageRoomSettings",
      "viewFinancialReports",
      "manageUsers",
      "manageStaff",
      "changePermissions",
    ],
  },
  staff: {
    views: [
      "dashboard",
      "reservations",
      "frontdesk",
      "rooms",
      "guests",
      "billing",
    ],
    can: [
      "createReservations",
      "checkAvailability",
      "checkInGuests",
      "checkOutGuests",
      "manageRooms",
      "addGuests",
      "viewGuestProfiles",
      "addBillingCharges",
      "processPayments",
    ],
  },
};

export function canAccessView(role, viewKey) {
  return !!ROLE_PERMISSIONS[role]?.views.includes(viewKey);
}

export const authService = {
  async loginRequest(email, password) {
    await new Promise((res) => setTimeout(res, 650));
    const match = USERS.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password,
    );
    if (!match) throw new Error("Invalid email or password.");
    if (match.status === "disabled")
      throw new Error(
        "This account has been disabled. Contact an administrator.",
      );
    // eslint-disable-next-line no-unused-vars
    const { password: _pw, ...safeUser } = match;
    return safeUser;
  },
  // eslint-disable-next-line no-unused-vars
  async requestPasswordReset(email) {
    await new Promise((res) => setTimeout(res, 500));
    return { ok: true };
  },
};
