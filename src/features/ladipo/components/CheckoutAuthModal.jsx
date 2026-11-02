import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { X, Lock, Mail, User, Phone, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { login as loginApi, signupRequest, verifyAccount } from "../../../services/apiAuth";
import { sendLoginOtp as sendLoginOtpApi, verifyLoginOtp as verifyLoginOtpApi } from "../../../services/apiAuth";
import { useGoogleLogin } from "../../auth/useOAuth";
import useCartStore from "../../../store/cartStore";

export default function CheckoutAuthModal({ open, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login"); // 'login' | 'signup' | 'otp' | 'verify'
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // OTP login
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Signup form
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Email verification (if required after signup)
  const [verifyCode, setVerifyCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const { loginWithGoogle, isLoadingGoogle } = useGoogleLogin();

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleCompleteAuth() {
    try {
      await useCartStore.getState().syncGuestCartToBackend();
    } catch {
      /* ignore */
    }
    toast.success("Signed in successfully! Continuing to checkout...");
    onClose();
    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/ladipo/checkout");
    }
  }

  // ── Password Login ──────────────────────────────────────────────────────────
  async function handlePasswordLogin(e) {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      return toast.error("Please enter your email and password");
    }

    setLoading(true);
    try {
      await loginApi({
        email: loginEmail.trim(),
        password: loginPassword.trim(),
      });
      await handleCompleteAuth();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to sign in";
      if (msg.includes("verify your email")) {
        setPendingEmail(loginEmail.trim());
        setTab("verify");
        toast.error("Please verify your email before continuing.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  // ── OTP Login ──────────────────────────────────────────────────────────────
  async function handleSendOtp(e) {
    e.preventDefault();
    if (!otpEmail.trim()) return toast.error("Please enter your email");

    setLoading(true);
    try {
      await sendLoginOtpApi(otpEmail.trim());
      setOtpSent(true);
      toast.success("A 6-digit one-time code has been sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    if (!otpCode.trim()) return toast.error("Please enter the 6-digit code");

    setLoading(true);
    try {
      await verifyLoginOtpApi({
        email: otpEmail.trim(),
        code: otpCode.trim(),
      });
      await handleCompleteAuth();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  }

  // ── Signup ─────────────────────────────────────────────────────────────────
  async function handleSignup(e) {
    e.preventDefault();
    if (!signupName.trim()) return toast.error("Please enter your full name");
    if (!signupEmail.trim()) return toast.error("Please enter your email");
    if (!signupPhone.trim()) return toast.error("Please enter your phone number");
    if (signupPassword.length < 6) return toast.error("Password must be at least 6 characters");

    setLoading(true);
    try {
      await signupRequest({
        name: signupName.trim(),
        email: signupEmail.trim(),
        phone_number: signupPhone.trim(),
        password: signupPassword,
        password_confirmation: signupPassword,
      });

      setPendingEmail(signupEmail.trim());
      setTab("verify");
      toast.success("Account created! Check your email for the verification code.");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  }

  // ── Email Verification ─────────────────────────────────────────────────────
  async function handleVerifyAccount(e) {
    e.preventDefault();
    if (!verifyCode.trim()) return toast.error("Please enter the verification code");

    setLoading(true);
    try {
      await verifyAccount({
        email: pendingEmail,
        code: verifyCode.trim(),
      });

      // After verification, sign in if we have the password, or transition to password login
      if (signupPassword) {
        await loginApi({
          email: pendingEmail,
          password: signupPassword,
        });
        await handleCompleteAuth();
      } else {
        toast.success("Email verified! Please sign in to continue.");
        setTab("login");
        setLoginEmail(pendingEmail);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  // ── Google OAuth ───────────────────────────────────────────────────────────
  function handleGoogleAuth() {
    try {
      sessionStorage.setItem("authRedirect", "/ladipo/checkout");
    } catch {
      /* ignore */
    }
    loginWithGoogle();
  }

  const inputCls =
    "w-full rounded-2xl border border-[#E1E6F4] bg-[#F9FAFC] px-4 py-3 text-[14px] text-[#05243F] placeholder-[#8A9EB0] outline-none transition-all focus:border-[#2389E3] focus:bg-white focus:ring-2 focus:ring-[#2389E3]/10";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[3px] p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white p-6 sm:p-8 shadow-2xl border border-[#E1E6F4] transition-all transform animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-[#697C8C] hover:bg-[#F4F5FC] hover:text-[#05243F] transition-colors cursor-pointer active:scale-95"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header Icon + Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#2389E3] mb-3">
            <Icon icon="solar:bag-check-bold" width="26" />
          </div>
          <h2 className="text-[22px] font-bold text-[#05243F]">
            {tab === "verify"
              ? "Verify Your Email"
              : tab === "otp"
              ? "One-Time Password"
              : "Checkout with Motoka"}
          </h2>
          <p className="mt-1 text-[13px] text-[#697C8C] max-w-xs">
            {tab === "verify"
              ? `Enter the code sent to ${pendingEmail}`
              : tab === "otp"
              ? "We'll email you a secure login code"
              : "Sign in or create an account to complete your auto parts order."}
          </p>
        </div>

        {/* Tab Switcher (Login vs Sign Up) */}
        {(tab === "login" || tab === "signup") && (
          <div className="flex rounded-full bg-[#F0F4F8] p-1 mb-6">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`flex-1 rounded-full py-2 text-[13px] font-semibold transition-all cursor-pointer ${
                tab === "login"
                  ? "bg-white text-[#05243F] shadow-sm"
                  : "text-[#697C8C] hover:text-[#05243F]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`flex-1 rounded-full py-2 text-[13px] font-semibold transition-all cursor-pointer ${
                tab === "signup"
                  ? "bg-white text-[#05243F] shadow-sm"
                  : "text-[#697C8C] hover:text-[#05243F]"
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* ── Tab: Password Login ── */}
        {tab === "login" && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#05243F] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-[#8A9EB0]" size={16} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={`${inputCls} pl-11`}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12px] font-semibold text-[#05243F]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setOtpEmail(loginEmail);
                    setTab("otp");
                  }}
                  className="text-[11px] font-semibold text-[#2389E3] hover:underline cursor-pointer"
                >
                  Use OTP code instead
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-[#8A9EB0]" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={`${inputCls} pl-11 pr-11`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-[#8A9EB0] hover:text-[#05243F] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#2389E3] py-3.5 text-[14px] font-bold text-white shadow-md shadow-[#2389E3]/20 transition-all hover:bg-[#1D74C2] active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In & Continue"}
            </button>

            {/* Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E1E6F4]" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-semibold text-[#8A9EB0] uppercase tracking-wider">
                Or
              </span>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoadingGoogle}
              className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#E1E6F4] bg-white py-3 text-[13px] font-semibold text-[#05243F] transition-all hover:bg-[#F9FAFC] active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              <Icon icon="logos:google-icon" width="18" />
              <span>Continue with Google</span>
            </button>
          </form>
        )}

        {/* ── Tab: Signup ── */}
        {tab === "signup" && (
          <form onSubmit={handleSignup} className="space-y-3.5">
            <div>
              <label className="block text-[12px] font-semibold text-[#05243F] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-[#8A9EB0]" size={16} />
                <input
                  type="text"
                  placeholder="e.g. Tunde Balogun"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className={`${inputCls} pl-11`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#05243F] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-[#8A9EB0]" size={16} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className={`${inputCls} pl-11`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#05243F] mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-[#8A9EB0]" size={16} />
                <input
                  type="tel"
                  placeholder="08012345678"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  className={`${inputCls} pl-11`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#05243F] mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-[#8A9EB0]" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className={`${inputCls} pl-11 pr-11`}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-[#8A9EB0] hover:text-[#05243F] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-full bg-[#2389E3] py-3.5 text-[14px] font-bold text-white shadow-md shadow-[#2389E3]/20 transition-all hover:bg-[#1D74C2] active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account & Continue"}
            </button>
          </form>
        )}

        {/* ── Tab: OTP Flow ── */}
        {tab === "otp" && (
          <div className="space-y-4">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#05243F] mb-1.5">
                    Your Account Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-[#8A9EB0]" size={16} />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={otpEmail}
                      onChange={(e) => setOtpEmail(e.target.value)}
                      className={`${inputCls} pl-11`}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#2389E3] py-3.5 text-[14px] font-bold text-white shadow-md shadow-[#2389E3]/20 transition-all hover:bg-[#1D74C2] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Sending Code..." : "Send One-Time Code"}
                </button>

                <button
                  type="button"
                  onClick={() => setTab("login")}
                  className="w-full text-center text-[12px] font-semibold text-[#697C8C] hover:text-[#05243F] cursor-pointer"
                >
                  ← Back to Password Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#05243F] mb-1.5">
                    Enter 6-digit Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className={`${inputCls} text-center font-mono text-lg tracking-widest`}
                    autoFocus
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#2389E3] py-3.5 text-[14px] font-bold text-white shadow-md shadow-[#2389E3]/20 transition-all hover:bg-[#1D74C2] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-center text-[12px] font-semibold text-[#697C8C] hover:text-[#05243F] cursor-pointer"
                >
                  Change Email or Resend
                </button>
              </form>
            )}
          </div>
        )}

        {/* ── Tab: Verify Email After Signup ── */}
        {tab === "verify" && (
          <form onSubmit={handleVerifyAccount} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#05243F] mb-1.5">
                Verification Code
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className={`${inputCls} text-center font-mono text-lg tracking-widest`}
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#2389E3] py-3.5 text-[14px] font-bold text-white shadow-md shadow-[#2389E3]/20 transition-all hover:bg-[#1D74C2] active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Confirm & Proceed to Checkout"}
            </button>

            <button
              type="button"
              onClick={() => setTab("login")}
              className="w-full text-center text-[12px] font-semibold text-[#697C8C] hover:text-[#05243F] cursor-pointer"
            >
              ← Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
