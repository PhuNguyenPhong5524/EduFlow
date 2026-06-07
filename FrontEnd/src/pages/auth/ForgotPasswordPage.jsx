import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../../services/authService";

const SCREEN = {
  FORGOT: "forgot",
  SUCCESS: "success",
  RESET: "reset",
};

function getStrength(val) {
  let strength = 0;
  const hasLength = val.length >= 8;
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);
  if (hasLength) strength += 50;
  if (hasSpecial) strength += 50;
  return { strength, hasLength, hasSpecial };
}

export default function ForgotPasswordPage() {
  const [screen, setScreen] = useState(SCREEN.FORGOT);
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const { strength, hasLength, hasSpecial } = getStrength(newPassword);

  function strengthLabel() {
    if (strength === 0)
      return { text: "Enter a password", color: "text-outline" };
    if (strength === 50) return { text: "Moderate", color: "text-amber-600" };
    return { text: "Strong password", color: "text-emerald-600" };
  }

  function strengthBarColor() {
    if (strength === 0) return "bg-error";
    if (strength === 50) return "bg-amber-500";
    return "bg-emerald-500";
  }

  async function handleForgot(e) {
    e.preventDefault();
    setApiError("");
    setSubmitting(true);
    try {
      await forgotPassword(email);
      setSentEmail(email);
      setScreen(SCREEN.SUCCESS);
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to send reset link.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleFinalSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setPassError("Password must be at least 8 characters");
      return;
    }
    setPassError("");
    setApiError("");
    setSubmitting(true);
    try {
      await resetPassword(sentEmail, newPassword);
      resetFlow();
      navigate("/login");
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetFlow() {
    setScreen(SCREEN.FORGOT);
    setEmail("");
    setSentEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setShowNewPass(false);
    setShowConfirmPass(false);
    setPassError("");
  }

  const label = strengthLabel();

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-stack-sm">
          <span className="font-display text-headline-md font-bold text-primary">
            EduFlow
          </span>
        </div>
        <div className="hidden md:flex items-center gap-gutter">
          <a
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Help Center
          </a>
          <a
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Contact Support
          </a>
        </div>
      </nav>

      {/* Main */}
      <main className="grow flex items-center justify-center px-margin-mobile pt-20 pb-10">
        {/* Forgot Password Screen */}
        {screen === SCREEN.FORGOT && (
          <div className="w-full max-w-110">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm p-stack-lg flex flex-col gap-stack-lg">
              <div className="text-center space-y-stack-sm">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mx-auto mb-stack-md">
                  <span className="material-symbols-outlined text-primary">
                    lock_reset
                  </span>
                </div>
                <h1 className="font-headline-md text-headline-md text-on-surface">
                  Quên mật khẩu?
                </h1>
                <p className="font-body-sm text-[13px] text-on-surface-variant">
                  Nhập địa chỉ email liên kết với tài khoản của bạn và chúng tôi sẽ gửi cho bạn một đường dẫn để đặt lại mật khẩu.
                </p>
              </div>

              <form className="space-y-stack-md" onSubmit={handleForgot}>
                <div className="space-y-1.5">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="email"
                  >
                    Địa chỉ Email
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      mail
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-sm"
                      id="email"
                      placeholder="name@gmail.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="w-full py-3 px-4 rounded-lg gradient-primary text-white font-label-md text-label-md shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Xác nhận gửi"}
                </button>
                {apiError && (
                  <p className="text-red-400 text-sm text-center mt-2">
                    {apiError}
                  </p>
                )}
              </form>

              <div className="text-center pt-stack-sm">
                <Link
                  className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors group"
                  to="/login"
                >
                  <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
                    arrow_back
                  </span>
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {screen === SCREEN.SUCCESS && (
          <div className="w-full max-w-110">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm p-stack-lg flex flex-col gap-stack-lg text-center">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mx-auto">
                <span
                  className="material-symbols-outlined text-secondary text-[32px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div className="space-y-stack-sm">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Check your email
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  We&apos;ve sent a password reset link to{" "}
                  <span className="font-semibold text-on-surface">
                    {sentEmail}
                  </span>
                  .
                </p>
              </div>
              <div className="bg-surface-container-low rounded-lg p-stack-md text-left flex gap-stack-md items-start">
                <span className="material-symbols-outlined text-outline text-[20px]">
                  info
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Didn&apos;t receive the email? Check your spam folder or try
                  again in 2 minutes.
                </p>
              </div>
              <button
                className="w-full py-3 px-4 rounded-lg bg-surface border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-all active:scale-[0.98]"
                onClick={() => setScreen(SCREEN.RESET)}
              >
                Open Email App
              </button>
              <div className="text-center pt-stack-sm">
                <button
                  className="font-label-md text-label-md text-primary hover:underline"
                  onClick={resetFlow}
                >
                  Resend link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Password Screen */}
        {screen === SCREEN.RESET && (
          <div className="w-full max-w-110">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm p-stack-lg flex flex-col gap-stack-lg">
              <div className="text-center space-y-stack-sm">
                <h1 className="font-headline-md text-headline-md text-on-surface">
                  Set new password
                </h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Your new password must be different from previously used
                  passwords.
                </p>
              </div>

              <form className="space-y-stack-md" onSubmit={handleFinalSubmit}>
                {/* New Password */}
                <div className="space-y-1.5">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="new-password"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      lock
                    </span>
                    <input
                      className="w-full pl-10 pr-10 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-sm"
                      id="new-password"
                      placeholder="••••••••"
                      required
                      type={showNewPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                      onClick={() => setShowNewPass((v) => !v)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showNewPass ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>

                  {/* Strength Meter */}
                  <div className="pt-2 space-y-2">
                    <div className="h-1.5 w-full bg-outline-variant/30 rounded-full overflow-hidden">
                      <div
                        className={`strength-bar h-full ${strengthBarColor()}`}
                        style={{ width: `${strength}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-label-sm text-label-sm ${label.color}`}
                      >
                        {label.text}
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">
                        {strength}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="confirm-password"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      lock
                    </span>
                    <input
                      className="w-full pl-10 pr-10 py-3 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-sm"
                      id="confirm-password"
                      placeholder="••••••••"
                      required
                      type={showConfirmPass ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                      onClick={() => setShowConfirmPass((v) => !v)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showConfirmPass ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Requirements */}
                <ul className="space-y-2 py-2">
                  <li
                    className={`flex items-center gap-2 text-label-sm ${hasLength ? "text-on-surface" : "text-on-surface-variant"}`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${hasLength ? "text-emerald-500" : "text-outline"}`}
                      style={
                        hasLength
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      {hasLength ? "check_circle" : "circle"}
                    </span>
                    At least 8 characters
                  </li>
                  <li
                    className={`flex items-center gap-2 text-label-sm ${hasSpecial ? "text-on-surface" : "text-on-surface-variant"}`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${hasSpecial ? "text-emerald-500" : "text-outline"}`}
                      style={
                        hasSpecial
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      {hasSpecial ? "check_circle" : "circle"}
                    </span>
                    Contain at least one special character
                  </li>
                </ul>

                {passError && (
                  <p className="font-body-sm text-body-sm text-error">
                    {passError}
                  </p>
                )}

                <button
                  className="w-full py-3 px-4 rounded-lg gradient-primary text-white font-label-md text-label-md shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Resetting..." : "Reset password"}
                </button>
              </form>

              <div className="text-center pt-stack-sm">
                <button
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                  onClick={resetFlow}
                >
                  Cancel and go back
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-stack-lg border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-stack-md">
          <p className="font-body-sm text-body-sm text-outline">
            © 2024 EduFlow Inc. All rights reserved.
          </p>
          <div className="flex gap-gutter">
            <a
              className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors"
              href="#"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
