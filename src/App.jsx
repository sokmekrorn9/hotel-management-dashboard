import { useState, useEffect } from "react";

// Firebase Authentication and Database Methods
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { authService } from "./auth/authService";

// Layout & View Components
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import {
  LoginView,
  ForgotPasswordView,
  AccessDeniedView,
} from "./pages/AuthViews";
import { DashboardView } from "./pages/DashboardView";
import { ReservationsView } from "./pages/ReservationsView";
import { FrontDeskView } from "./pages/FrontDeskView";
import { RoomsView } from "./pages/RoomsView";
import { GuestsView, GuestProfileModal } from "./pages/GuestsView";
import { seedRoomsDatabase } from "./utils/seedRooms";
import { BillingView } from "./pages/BillingView";
import { ReportsView } from "./pages/ReportsView";
import { PromotionsView } from "./pages/PromotionsView";
import { SettingsView } from "./pages/SettingsView";
import { UserManagementView } from "./pages/UserManagementView";

// Modal Component Group
import {
  CheckinModal,
  CheckoutModal,
  WalkInModal,
  NewReservationModal,
  AddGuestModal,
  CreateInvoiceModal,
  RoomDetailModal,
  ReservationDetailModal,
  EditUserProfileModal,
  LogoutConfirmModal,
} from "./components/modals/ActionModals";

// Utilities
import { ToastStack } from "./components/common/ToastStack";
import { useToasts } from "./hooks/useToasts";
import { canAccessView } from "./data/mockData";

export default function App() {
  // -------------------------------------------------------------
  // 1. Session State: Checks localStorage first to persist user session
  // -------------------------------------------------------------
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("hotel_auth_user")) || null;
    } catch {
      return null;
    }
  });

  // UI Control & Navigation State
  const [view, setView] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roomStatusFilter, setRoomStatusFilter] = useState("All");

  // Authentication UI State
  const [authScreen, setAuthScreen] = useState("login"); // "login" | "forgot"
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  // Firestore Live Data Arrays
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [guests] = useState([]); // Can also be converted to Firestore onSnapshot

  // Active Modal Selection State
  const [checkinRes, setCheckinRes] = useState(null);
  const [checkoutRes, setCheckoutRes] = useState(null);
  const [viewRes, setViewRes] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const { toasts, push } = useToasts();

  // -------------------------------------------------------------
  // 2. Firebase Auth Listener (Runs on Mount)
  // -------------------------------------------------------------
  useEffect(() => {
    seedRoomsDatabase();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // If a Firebase Admin user is active, fetch their role profile from Firestore
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const userData = { uid: firebaseUser.uid, ...userSnapshot.data() };
            setUser(userData);
            localStorage.setItem("hotel_auth_user", JSON.stringify(userData));
          }
        } catch (error) {
          console.error("Error fetching user document from Firestore:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // -------------------------------------------------------------
  // 3. Firestore Live Sync Listener
  // -------------------------------------------------------------
  useEffect(() => {
    // If no session exists, skip listener setup
    if (!user) return;

    // A. Listen to 'rooms' collection
    const roomsRef = collection(db, "rooms");
    const unsubRooms = onSnapshot(
      roomsRef,
      (snapshot) => {
        const fetchedRooms = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setRooms(fetchedRooms);
      },
      (error) => {
        console.error("Firestore rooms subscription error:", error);
      },
    );

    // B. Listen to 'reservations' collection
    const reservationsRef = collection(db, "reservations");
    const unsubReservations = onSnapshot(
      reservationsRef,
      (snapshot) => {
        const fetchedReservations = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setReservations(fetchedReservations);
      },
      (error) => {
        console.error("Firestore reservations subscription error:", error);
      },
    );

    // Clean up websocket connections on unmount or logout
    return () => {
      unsubRooms();
      unsubReservations();
    };
  }, [user]);
  // -------------------------------------------------------------
  // 4. Authentication Action Handlers
  // -------------------------------------------------------------

  // Real Admin Login using Firebase Auth + Firestore
  const handleAdminLogin = async (email, password) => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const adminUser = await authService.adminLoginRequest(email, password);
      setUser(adminUser);
      localStorage.setItem("hotel_auth_user", JSON.stringify(adminUser));
      setView("dashboard");
      push("Welcome back, Administrator!");
    } catch (err) {
      setAuthError(err.message || "Failed to log in as Admin.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Instant Staff Login (Bypasses Firebase Auth)
  const handleQuickStaffLogin = () => {
    const staffUser = authService.getStaffUser();
    setUser(staffUser);
    localStorage.setItem("hotel_auth_user", JSON.stringify(staffUser));
    setView("dashboard");
    push("Logged in as Hotel Staff");
  };

  // Logout Handler
  const confirmLogout = async () => {
    try {
      if (user?.uid && user.uid !== "staff-local-id") {
        await signOut(auth); // 👈 Directly call Firebase signOut
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("hotel_auth_user");
      setRooms([]);
      setReservations([]);
      setAuthScreen("login");
      setLogoutConfirmOpen(false);
      setView("dashboard");
      push("Logged out successfully");
    }
  };

  // User Profile Update Handler
  const handleProfileSave = async (updatedData) => {
    try {
      if (user?.uid && user.uid !== "staff-local-id") {
        await authService.updateProfile(user.uid, updatedData);
      }
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem("hotel_auth_user", JSON.stringify(updatedUser));
      setEditProfileOpen(false);
      push("Profile updated successfully");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      push("Failed to update profile.");
    }
  };
  // -------------------------------------------------------------
  // 5. Database Actions (Check-in, Check-out, Room Status)
  // -------------------------------------------------------------

  const handleCheckin = async (res) => {
    try {
      // 1. Update reservation document in Firestore
      await updateDoc(doc(db, "reservations", res.id), {
        status: "Checked In",
      });

      // 2. Update room document status in Firestore
      await updateDoc(doc(db, "rooms", String(res.roomId)), {
        status: "Occupied",
      });

      setCheckinRes(null);
      push(`${res.guestName} checked in to room ${res.roomNumber}`);
    } catch (err) {
      console.error("Firestore Check-in Error:", err);
      push("Failed to complete check-in on database.");
    }
  };

  const handleCheckout = async (res) => {
    try {
      await updateDoc(doc(db, "reservations", res.id), {
        status: "Checked Out",
      });
      await updateDoc(doc(db, "rooms", String(res.roomId)), {
        status: "Vacant Dirty",
      });

      setCheckoutRes(null);
      push(`${res.guestName} checked out.`);
    } catch (err) {
      console.error("Firestore Check-out Error:", err);
      push("Failed to complete checkout on database.");
    }
  };

  const handleRoomStatusChange = async (room, status) => {
    try {
      await updateDoc(doc(db, "rooms", String(room.id)), { status: status });
      setSelectedRoom((prev) => (prev ? { ...prev, status } : prev));
      push(`Room ${room.roomNumber} updated to ${status}`);
    } catch (err) {
      console.error("Firestore Room Status Change Error:", err);
      push("Failed to update room status on database.");
    }
  };

  const onQuickAction = (action) => {
    if (action === "New Reservation") setActiveModal("newres");
    else if (action === "Walk-in Guest") setActiveModal("walkin");
    else if (action === "Check-in" || action === "Check-out")
      setView("frontdesk");
    else if (action === "Add Guest") setActiveModal("addguest");
    else if (action === "Create Invoice") setActiveModal("invoice");
  };
  // -------------------------------------------------------------
  // 6. Unauthenticated Screen Render
  // -------------------------------------------------------------
  if (!user) {
    return (
      <>
        {authScreen === "login" ? (
          <LoginView
            onAdminLogin={handleAdminLogin}
            onQuickStaffLogin={handleQuickStaffLogin}
            loading={authLoading}
            error={authError}
            onForgot={() => setAuthScreen("forgot")}
          />
        ) : (
          <ForgotPasswordView
            onBack={() => setAuthScreen("login")}
            push={push}
          />
        )}
        <ToastStack toasts={toasts} />
      </>
    );
  }

  // Verify view permissions based on user role ("admin" or "staff")
  const allowedView = canAccessView(user.role, view) ? view : "denied";

  // -------------------------------------------------------------
  // 7. Authenticated App Layout Render
  // -------------------------------------------------------------
  return (
    <div
      className="flex min-h-screen bg-gray-50 font-sans"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Sidebar Navigation */}
      <Sidebar
        view={view}
        setView={setView}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        user={user}
        onLogout={() => setLogoutConfirmOpen(true)}
        onEditProfile={() => setEditProfileOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        <Header
          setMobileOpen={setMobileOpen}
          onQuickAction={onQuickAction}
          push={push}
          user={user}
          onLogout={() => setLogoutConfirmOpen(true)}
          setView={setView}
          onEditProfile={() => setEditProfileOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 flex flex-col">
          {allowedView === "denied" && (
            <AccessDeniedView onBack={() => setView("dashboard")} />
          )}
          {allowedView === "dashboard" && (
            <DashboardView
              rooms={rooms}
              reservations={reservations}
              onCheckin={setCheckinRes}
              onCheckout={setCheckoutRes}
              onFilterRooms={(s) => {
                setRoomStatusFilter(s);
                setView("rooms");
              }}
            />
          )}
          {allowedView === "reservations" && (
            <ReservationsView
              reservations={reservations}
              onView={setViewRes}
              onCheckin={setCheckinRes}
            />
          )}
          {allowedView === "frontdesk" && (
            <FrontDeskView
              reservations={reservations}
              rooms={rooms}
              onCheckin={setCheckinRes}
              onCheckout={setCheckoutRes}
              onWalkIn={() => setActiveModal("walkin")}
            />
          )}
          {allowedView === "rooms" && (
            <RoomsView
              rooms={rooms}
              statusFilter={roomStatusFilter}
              setStatusFilter={setRoomStatusFilter}
              onRoomClick={setSelectedRoom}
            />
          )}
          {allowedView === "guests" && (
            <GuestsView guests={guests} onSelect={setSelectedGuest} />
          )}
          {allowedView === "billing" && (
            <BillingView reservations={reservations} push={push} />
          )}
          {allowedView === "reports" && <ReportsView />}
          {allowedView === "promotions" && <PromotionsView guests={guests} />}
          {allowedView === "settings" && <SettingsView />}
          {allowedView === "usermanagement" && (
            <UserManagementView push={push} />
          )}
        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Modal Overlays (Mounted conditionally at bottom of return)   */}
      {/* ------------------------------------------------------------- */}
      {checkinRes && (
        <CheckinModal
          reservation={checkinRes}
          onClose={() => setCheckinRes(null)}
          onConfirm={handleCheckin}
        />
      )}
      {checkoutRes && (
        <CheckoutModal
          reservation={checkoutRes}
          onClose={() => setCheckoutRes(null)}
          onConfirm={handleCheckout}
        />
      )}
      {viewRes && (
        <ReservationDetailModal
          reservation={viewRes}
          onClose={() => setViewRes(null)}
        />
      )}
      {selectedGuest && (
        <GuestProfileModal
          guest={selectedGuest}
          onClose={() => setSelectedGuest(null)}
        />
      )}
      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onChangeStatus={handleRoomStatusChange}
          reservations={reservations}
        />
      )}
      {activeModal === "walkin" && (
        <WalkInModal
          onClose={() => setActiveModal(null)}
          onConfirm={() => {
            setActiveModal(null);
            push("Walk-in created");
          }}
        />
      )}
      {activeModal === "newres" && (
        <NewReservationModal
          onClose={() => setActiveModal(null)}
          onConfirm={() => {
            setActiveModal(null);
            push("Reservation created");
          }}
        />
      )}
      {activeModal === "addguest" && (
        <AddGuestModal
          onClose={() => setActiveModal(null)}
          onConfirm={() => {
            setActiveModal(null);
            push("Guest added");
          }}
        />
      )}
      {activeModal === "invoice" && (
        <CreateInvoiceModal
          onClose={() => setActiveModal(null)}
          onConfirm={() => {
            setActiveModal(null);
            push("Invoice generated");
          }}
        />
      )}
      {editProfileOpen && (
        <EditUserProfileModal
          user={user}
          onClose={() => setEditProfileOpen(false)}
          onSave={handleProfileSave}
        />
      )}
      {logoutConfirmOpen && (
        <LogoutConfirmModal
          onClose={() => setLogoutConfirmOpen(false)}
          onConfirm={confirmLogout}
        />
      )}

      {/* Toast Notification Container */}
      <ToastStack toasts={toasts} />
    </div>
  );
}
