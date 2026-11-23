import MarketingPage from "../components/MarketingPage";

const SECTIONS = [
  {
    title: "Introduction",
    body: "Motoka (\"we\", \"us\") operates the Motoka mobile app and website (motokaapp.ng). This Privacy Policy explains what information we collect, how we use it, and your rights. By using Motoka, you agree to this policy.",
  },
  {
    title: "Information we collect",
    body: "Account details (name, email, phone number), vehicle and document details (plate number, licence/insurance/roadworthiness records), payment and transaction records, device and usage information (device type, OS, app version, crash logs), and location data only when you grant permission (e.g., to find nearby services). We do not collect precise location in the background.",
  },
  {
    title: "How we use your information",
    body: "To provide and improve our services: process renewals, send expiry reminders, verify documents against agency records, handle payments, provide customer support, prevent fraud, and comply with legal obligations. We do not sell your personal data.",
  },
  {
    title: "Sharing",
    body: "We share data only with the licensed agents and government agencies required to process your renewal, with payment processors to complete transactions, and with service providers (hosting, analytics) under confidentiality agreements. We may disclose information if required by law.",
  },
  {
    title: "Data retention",
    body: "We retain your account and document records for as long as your account is active and as required by law for financial and regulatory records. You may request deletion of your account and associated personal data at any time (see Delete Account).",
  },
  {
    title: "Your rights",
    body: "You can access, correct, or delete your personal data, and withdraw consent for optional processing. Contact us at support@motoka.com. We respond within 30 days.",
  },
  {
    title: "Cookies and tracking",
    body: "We use essential cookies and, with your consent, analytics (Google Analytics) and the Meta Pixel. You can decline tracking in the cookie banner; declining disables all analytics scripts.",
  },
  {
    title: "Children",
    body: "Motoka is not intended for users under 18. We do not knowingly collect data from children.",
  },
  {
    title: "Changes",
    body: "We may update this policy. Material changes will be communicated in the app or by email. The effective date is shown at the top of this page.",
  },
  {
    title: "Contact",
    body: "Questions about this policy: support@motoka.com.",
  },
];

export default function Privacy() {
  return (
    <MarketingPage
      title="Privacy Policy"
      description="How Motoka collects, uses, stores and protects your personal data."
      path="/privacy"
      ctaLabel="Delete my account"
      ctaTo="/delete-account"
    >
      <p className="text-sm text-gray-500">Effective date: 23 November 2026</p>
      {SECTIONS.map((s) => (
        <div key={s.title}>
          <h2 className="text-xl font-semibold text-[#05243F]">{s.title}</h2>
          <p>{s.body}</p>
        </div>
      ))}
    </MarketingPage>
  );
}
