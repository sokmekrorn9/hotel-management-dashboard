// src/utils/seedRooms.js
// eslint-disable-next-line no-unused-vars
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const INITIAL_ROOMS = [
  {
    id: "101",
    roomNumber: "101",
    floor: 1,
    type: "Standard King",
    price: 120,
    status: "Vacant Clean",
  },
  {
    id: "102",
    roomNumber: "102",
    floor: 1,
    type: "Standard Twin",
    price: 110,
    status: "Occupied",
  },
  {
    id: "201",
    roomNumber: "201",
    floor: 2,
    type: "Deluxe Suite",
    price: 250,
    status: "Vacant Clean",
  },
  {
    id: "202",
    roomNumber: "202",
    floor: 2,
    type: "Executive Suite",
    price: 350,
    status: "Vacant Dirty",
  },
  {
    id: "301",
    roomNumber: "301",
    floor: 3,
    type: "Presidential Suite",
    price: 600,
    status: "Maintenance",
  },
];

export async function seedRoomsDatabase() {
  try {
    for (const room of INITIAL_ROOMS) {
      await setDoc(doc(db, "rooms", room.id), room);
    }
    console.log("Rooms successfully seeded to Firestore!");
  } catch (error) {
    console.error("Error seeding rooms:", error);
  }
}
