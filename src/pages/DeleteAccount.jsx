import { useState } from "react";
import MarketingPage from "../components/MarketingPage";

export default function DeleteAccount() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Account Deletion Request");
    const body = encodeURIComponent(
      `Please delete my Motoka account and associated personal data.\n\nRegistered email: ${email}\nReason (optional): ${reason}\n`,
    );
    window.location.href = `mailto:support@motoka.com?subject=${subject}&body=${body}`;
  };

  return (
    <MarketingPage
      title="Delete Your Account"
      description="Request deletion of your Motoka account and personal data."
      path="/delete-account"
      ctaLabel="Back to home"
      ctaTo="/"
    >
      <p>
        You can request deletion of your Motoka account and associated personal
        data at any time. We process requests within 30 days and confirm by
        email.
      </p>
      <h2 className="text-xl font-semibold text-[#05243F]">How to request deletion</h2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>In the Motoka app: Settings → Account → Delete account (if available in your version).</li>
        <li>
          Or submit the form below, which emails{" "}
          <a href="mailto:support@motoka.com" className="text-[#2389E3] hover:underline">
            support@motoka.com
          </a>{" "}
          with your request.
        </li>
      </ol>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#05243F] mb-1" htmlFor="da-email">
            Registered email
          </label>
          <input
            id="da-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[10px] border border-gray-300 px-4 py-3 text-base focus:border-[#2389E3] focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#05243F] mb-1" htmlFor="da-reason">
            Reason (optional)
          </label>
          <textarea
            id="da-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="w-full rounded-[10px] border border-gray-300 px-4 py-3 text-base focus:border-[#2389E3] focus:outline-none"
            placeholder="Tell us why (optional)"
          />
        </div>
        <button
          type="submit"
          className="inline-flex rounded-[10px] bg-[#2389E3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2389E3]"
        >
          Request deletion
        </button>
      </form>
      <p className="text-sm text-gray-500">
        Note: deleting your account removes your personal data and vehicle records
        from our active systems. Some records (e.g., payment/transaction logs) may
        be retained as required by law. For questions, contact support@motoka.com.
      </p>
    </MarketingPage>
  );
}
