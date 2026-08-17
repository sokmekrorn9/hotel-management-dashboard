import { useState } from "react";
import {
  Building2,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  Shield,
  UserCheck,
} from "lucide-react";

// Helper component (internal)
function AuthShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-7">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-3">
            <Building2 size={24} className="text-white" />
          </div>
          <p className="text-white font-semibold tracking-wide text-sm">
            GRAND MERIDIAN
          </p>
          <p className="text-slate-400 text-xs tracking-[0.2em]">
            HOTEL MANAGEMENT SYSTEM
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          {children}
        </div>
        <p className="text-center text-slate-500 text-xs mt-5 flex items-center justify-center gap-1.5">
          <Lock size={12} /> Secure Hotel PMS
        </p>
      </div>
    </div>
  );
}

// 1. Export LoginView
export function LoginView({
  onAdminLogin,
  onQuickStaffLogin,
  loading,
  error,
  onForgot,
}) {
  const [email, setEmail] = useState("admin@hotel.com");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    onAdminLogin(email, password);
  };

  return (
    <AuthShell>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome Back</h2>
      <p className="text-sm text-gray-500 mb-6">
        Sign in to manage your property.
      </p>

      {error && (
        <div className="mb-4 flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg px-3 py-2.5">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-3.5">
          <span className="block text-xs font-medium text-gray-600 mb-1.5">
            Admin Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </label>

        <label className="block mb-3.5">
          <span className="block text-xs font-medium text-gray-600 mb-1.5">
            Password
          </span>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={onForgot}
            className="text-xs font-medium text-indigo-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 mb-3"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Shield size={16} />
          )}{" "}
          Login as Admin (Firebase)
        </button>
      </form>

      <div className="my-4 border-t border-gray-100 text-center text-xs text-gray-400 py-1">
        OR
      </div>

      <button
        type="button"
        onClick={onQuickStaffLogin}
        className="w-full border-2 border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2"
      >
        <UserCheck size={16} className="text-emerald-600" /> Instant Staff Login
      </button>
    </AuthShell>
  );
}

// 2. Export ForgotPasswordView
export function ForgotPasswordView({ onBack, push }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    if (push) push("Password reset link sent!");
  };

  return (
    <AuthShell>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft size={15} /> Back to Login
      </button>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Forgot Password?
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Enter your email address to receive reset instructions.
      </p>

      {sent ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg p-3">
          Password reset instructions have been sent to <strong>{email}</strong>
          .
        </div>
      ) : (
        <form onSubmit={submit}>
          <label className="block mb-4">
            <span className="block text-xs font-medium text-gray-600 mb-1.5">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hotel.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg"
          >
            Send Reset Link
          </button>
        </form>
      )}
    </AuthShell>
  );
}

// 3. Export AccessDeniedView
export function AccessDeniedView({ onBack }) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-4">
          <Lock size={26} className="text-rose-500" />
        </div>
        <p className="text-4xl font-bold text-gray-900 mb-1">403</p>
        <p className="text-lg font-semibold text-gray-900 mb-2">
          Access Denied
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You don't have permission to access this page.
        </p>
        <button
          onClick={onBack}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
