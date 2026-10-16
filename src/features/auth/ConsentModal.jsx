"use client"

import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { updateConsents } from "../../services/apiProfile";

/**
 * Blocking first-login consent modal.
 *
 * Shown to users whose profile has no terms_accepted_at — Google signups who
 * skipped the form, and accounts created before consents existed. There is
 * no dismiss: the app stays behind this until Terms are accepted.
 */
export default function ConsentModal({ eligible, onDone }) {
  const [terms, setTerms] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!terms) {
      toast.error("Please accept the Terms & Conditions to continue");
      return;
    }
    setSaving(true);
    try {
      const res = await updateConsents({ terms_accepted: true, auto_renew: autoRenew });
      if (res?.success === false) throw new Error(res?.message);
      toast.success("Preferences saved — welcome to Motoka!");
      onDone?.(res?.data?.consents);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Could not save preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05243F]/60 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <h2 className="text-xl font-semibold text-[#05243F]">
          One quick thing before you continue
        </h2>
        <p className="mt-1 text-sm text-[#05243F]/60">
          We&apos;ve updated what we ask every Motoka user to agree to. It takes
          ten seconds.
        </p>

        <div className="mt-5 space-y-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#2389E3]"
            />
            <span className="text-sm text-[#05243F]">
              I agree to the{" "}
              <Link
                to="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#2389E3] underline hover:text-[#A73957]"
              >
                Terms &amp; Conditions
              </Link>
            </span>
          </label>

          <label className={`flex items-start gap-3 ${eligible ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}>
            <input
              type="checkbox"
              checked={autoRenew}
              disabled={!eligible}
              onChange={(e) => setAutoRenew(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#2389E3] disabled:cursor-not-allowed"
            />
            <span className="text-sm text-[#05243F]">
              Enable auto-renew — Motoka may process my due renewals
              automatically, even before my payment for that cycle clears.
              {!eligible && (
                <span className="mt-1 block text-xs text-[#05243F]/60">
                  Available after your first successful payment.
                </span>
              )}
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!terms || saving}
          className="mt-6 w-full rounded-3xl bg-[#2389E3] px-4 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:bg-[#1c6fb8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Saving…" : "Continue"}
        </button>
      </div>
    </div>
  );
}
