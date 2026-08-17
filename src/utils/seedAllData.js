import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { ROOMS, RESERVATIONS, GUESTS, INVOICES } from "../data/mockData";

export async function seedAllDatabaseData() {
  try {
    // Seed Rooms
    for (const item of ROOMS) {
      await setDoc(doc(db, "rooms", String(item.id)), item);
    }
    // Seed Reservations
    for (const item of RESERVATIONS) {
      await setDoc(doc(db, "reservations", String(item.id)), item);
    }
    // Seed Guests
    for (const item of GUESTS) {
      await setDoc(doc(db, "guests", String(item.id)), item);
    }
    // Seed Invoices
    for (const item of INVOICES) {
      await setDoc(doc(db, "invoices", String(item.id)), item);
    }
    console.log("SUCCESS: All mock data successfully seeded to Firebase!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
