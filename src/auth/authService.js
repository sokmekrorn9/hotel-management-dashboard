import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const MOCK_STAFF_USER = {
  uid: "staff-local-id",
  name: "Hotel Staff",
  email: "staff@hotel.com",
  role: "staff",
  status: "active",
  avatar: "https://i.pravatar.cc/64?img=33",
};

export const authService = {
  // 1. REAL ADMIN LOGIN via Firebase
  async adminLoginRequest(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) {
      throw new Error("Admin record not found in database.");
    }

    const userData = userDoc.data();
    if (userData.role !== "admin") {
      throw new Error(
        "Access denied. This login is reserved for Administrators.",
      );
    }

    return { uid, ...userData };
  },

  // 2. MOCK STAFF LOGIN
  getStaffUser() {
    return MOCK_STAFF_USER;
  },

  // 👇 3. ADD THIS LOGOUT FUNCTION
  async logout() {
    await signOut(auth);
  },
};
