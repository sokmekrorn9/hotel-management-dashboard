import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const hotelService = {
  // 1. Create New Reservation in Firestore
  async createReservation(data) {
    const resRef = collection(db, "reservations");
    return await addDoc(resRef, {
      guestName: data.guestName || "New Guest",
      roomNumber: data.roomNumber || "Unassigned",
      roomId: data.roomId || null,
      checkIn: data.checkIn || new Date().toISOString().split("T")[0],
      checkOut: data.checkOut || "",
      amount: Number(data.amount) || 0,
      status: data.status || "Confirmed",
      createdAt: serverTimestamp(),
    });
  },

  // 2. Process Walk-in Guest (Creates reservation & updates room status)
  async createWalkIn(data) {
    // Add new reservation marked as Checked In
    const resRef = collection(db, "reservations");
    const newRes = await addDoc(resRef, {
      guestName: data.guestName,
      roomNumber: data.roomNumber,
      roomId: data.roomId,
      checkIn: new Date().toISOString().split("T")[0],
      checkOut: data.checkOut,
      amount: Number(data.amount) || 0,
      status: "Checked In",
      createdAt: serverTimestamp(),
    });

    // Automatically set the selected room to 'Occupied'
    if (data.roomId) {
      await updateDoc(doc(db, "rooms", String(data.roomId)), {
        status: "Occupied",
      });
    }

    return newRes;
  },

  // 3. Save a New Guest Profile in 'guests' collection
  async addGuest(guestData) {
    const guestsRef = collection(db, "guests");
    return await addDoc(guestsRef, {
      name: guestData.name,
      email: guestData.email || "",
      phone: guestData.phone || "",
      idType: guestData.idType || "Passport",
      idNumber: guestData.idNumber || "",
      visits: 1,
      createdAt: serverTimestamp(),
    });
  },

  // 4. Save a New Invoice in 'invoices' collection
  async createInvoice(invoiceData) {
    const billingRef = collection(db, "invoices");
    return await addDoc(billingRef, {
      guestName: invoiceData.guestName,
      roomNumber: invoiceData.roomNumber,
      amount: Number(invoiceData.amount) || 0,
      status: invoiceData.status || "Pending",
      dueDate: invoiceData.dueDate || new Date().toISOString().split("T")[0],
      createdAt: serverTimestamp(),
    });
  },
};
