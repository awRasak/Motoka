import MarketingPage from "../components/MarketingPage";
import { Link } from "react-router-dom";

const LAST_UPDATED = "15 October 2026";

function Section({ title, children }) {
  return (
    <div>
      <h2 className="mb-3 text-xl font-bold text-[#05243F]">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default function Terms() {
  return (
    <MarketingPage
      title="Terms & Conditions"
      description="The rules that govern your use of Motoka — renewals, payments, auto-renew, refunds, and liability."
      path="/terms"
      ctaLabel="Create a free account"
      ctaTo="/auth/signup"
    >
      <p className="text-sm text-[#05243F66]">Last updated: {LAST_UPDATED}</p>
      <p>
        These Terms &amp; Conditions (&quot;Terms&quot;) form a binding agreement between you
        (&quot;you&quot; or &quot;User&quot;) and Motoka (&quot;we&quot;, &quot;us&quot;, or
        &quot;Motoka&quot;). By creating an account, placing an order, or using any part of
        our website or mobile application, you agree to these Terms. If you do not agree,
        please do not use our services.
      </p>

      <Section title="1. What Motoka does">
        <p>
          Motoka is a vehicle-compliance platform. We help you track, renew, and manage
          vehicle documents — including vehicle licences, roadworthiness certificates,
          insurance, driver licences, and related papers — and we operate a marketplace
          for verified spare parts.
        </p>
        <p>
          We are not a government agency, licensing office, or insurer. Where a document
          is issued by a government authority or underwriter, Motoka acts as your agent:
          we prepare, submit, and follow up on your application on your behalf.
        </p>
      </Section>

      <Section title="2. Your account">
        <ul className="list-disc space-y-2 pl-5">
          <li>You must be at least 18 years old to use Motoka.</li>
          <li>
            The name, email, phone number, and vehicle details you provide must be
            accurate. Wrong plate numbers, chassis numbers, or engine numbers can cause
            your application to be rejected by the issuing authority.
          </li>
          <li>
            Keep your login credentials confidential. Activity on your account is
            presumed to be yours until you tell us otherwise at support.
          </li>
        </ul>
      </Section>

      <Section title="3. Orders and fulfilment">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            An order is created when you submit a renewal request and complete
            checkout. Orders are processed in the order received, subject to
            verification of your details and payment.
          </li>
          <li>
            Some renewals require physical inspection of the vehicle or your presence
            (for example, certain roadworthiness renewals in Lagos). Where this
            applies, we will tell you before or shortly after you pay, and processing
            timelines run from when the inspection requirement is met.
          </li>
          <li>
            Processing timelines shown in the app are estimates. Delays by issuing
            authorities, failed inspections, or incorrect details you supplied may
            extend them. We will keep you updated on your order status in the app.
          </li>
        </ul>
      </Section>

      <Section title="4. Payments">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            All prices are shown in Naira (₦) and include our service charge unless
            stated otherwise. Government and statutory fees may change without notice;
            if a fee changes after you order but before we submit, we will contact
            you before proceeding.
          </li>
          <li>
            Payments are processed through licensed third-party gateways. Motoka does
            not store your card details.
          </li>
          <li>
            If a payment fails or is reversed after we have already submitted your
            application, you remain liable for the fees we incurred, and we may
            pause further processing until the balance is settled.
          </li>
        </ul>
      </Section>

      <Section title="5. Auto-renew">
        <p>
          Auto-renew is optional and off by default. If you tick the auto-renew
          consent box when signing up (or enable it later in your settings), you
          authorise Motoka to start processing your due renewals without waiting for
          you to place each order manually — including where your payment for that
          cycle has not yet been confirmed.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Where we fulfil a renewal before your payment clears, the amount remains
            due from you, and we may collect it through your saved payment method,
            wallet balance, or any other lawful means.
          </li>
          <li>
            You can switch auto-renew off at any time in your settings. Switching it
            off stops future automatic processing; it does not cancel renewals
            already in progress or erase amounts already owed.
          </li>
        </ul>
      </Section>

      <Section title="6. Delivery of documents">
        <p>
          Completed documents are delivered as digital copies in the app and, where
          you selected physical delivery at checkout, by courier to the address you
          provided. Risk of loss after dispatch to your confirmed address passes to
          you, but tell us promptly about any delivery problem and we will help
          resolve it with the courier.
        </p>
      </Section>

      <Section title="7. Cancellations and refunds">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            You may cancel an order before we submit your application to the issuing
            authority for a full refund of that order.
          </li>
          <li>
            Once an application has been submitted — or statutory fees paid on your
            behalf — those third-party fees are non-refundable. Our service charge
            is refundable only where we have not yet started work on your order.
          </li>
          <li>
            Approved refunds are processed to your original payment method or Motoka
            wallet within 14 business days.
          </li>
        </ul>
      </Section>

      <Section title="8. Acceptable use">
        <p>
          You must not misuse the platform — including submitting false documents,
          using another person&apos;s vehicle details without authority, attempting to
          access other users&apos; accounts, or interfering with the operation of the
          service. We may suspend or close accounts that breach this section.
        </p>
      </Section>

      <Section title="9. Liability">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            We exercise reasonable care and skill in preparing and following up on
            your applications. However, final issuance of any document rests with
            the relevant authority or insurer, and we are not liable for their
            refusal, delay, or error where we submitted correctly.
          </li>
          <li>
            To the maximum extent permitted by law, our total liability for any
            order is limited to the service charge you paid us for that order
            (excluding third-party statutory fees).
          </li>
          <li>
            Nothing in these Terms limits liability that cannot be limited under
            Nigerian law, including liability for fraud.
          </li>
        </ul>
      </Section>

      <Section title="10. Privacy">
        <p>
          We collect and use your personal data to provide the services — for
          example, sharing your vehicle details with issuing authorities and
          contacting you with reminders. Details are in our Privacy Policy. By
          using Motoka you consent to that processing.
        </p>
      </Section>

      <Section title="11. Changes to these Terms">
        <p>
          We may update these Terms from time to time. Material changes will be
          notified in the app or by email at least 7 days before they take effect.
          Continued use after the effective date constitutes acceptance.
        </p>
      </Section>

      <Section title="12. Governing law and contact">
        <p>
          These Terms are governed by the laws of the Federal Republic of Nigeria.
          Disputes will first be addressed through good-faith negotiation, failing
          which either party may approach the courts of Lagos State.
        </p>
        <p>
          Questions about these Terms: contact us through the{" "}
          <Link to="/contact" className="text-[#2389E3] hover:underline">
            Contact page
          </Link>{" "}
          or in-app support.
        </p>
      </Section>
    </MarketingPage>
  );
}
