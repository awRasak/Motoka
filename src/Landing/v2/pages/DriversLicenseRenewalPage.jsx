import ServicePageTemplate from '../ServicePageTemplate'

// Driver's licence is a federal (FRSC) document tied to the person, not the
// vehicle — distinct from the vehicle licence money page. Fees and validity
// options change; keep figures indicative and confirmed at checkout.
export default function DriversLicenseRenewalPage() {
  return (
    <ServicePageTemplate
      seoTitle="Driver's Licence Renewal in Nigeria — Cost, Requirements & Steps (2026) | Motoka"
      seoPath="/renew/drivers-license"
      seoDescription="How to renew your Nigerian driver's licence online: what it costs, the documents you need, 3- vs 5-year validity, and how to avoid the FRSC/BIR office queue. Renew with Motoka."
      eyebrow="Driver's Licence Renewal"
      h1="Renew your driver's licence in Nigeria without the office queue"
      subcopy="Your driver's licence is issued by the FRSC and tied to you — not your car — with its own expiry date. Start your renewal online, see the cost before you pay, and Motoka handles the processing so you spend less time at the BIR/FRSC capture centre."
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Renewals', path: '/renew/vehicle-license' },
        { name: "Driver's Licence", path: '/renew/drivers-license' },
      ]}
      service={{
        name: "Driver's licence renewal",
        serviceType: "Driver's licence renewal",
        priceRange: '15000-35000',
      }}
      lastUpdated="7 November 2026"
      author="the Motoka Renewals Team"
      steps={[
        {
          title: 'Confirm your licence details',
          description: "Share your current driver's licence number or the details on your expiring card so we can match the right record.",
        },
        {
          title: 'Choose validity & see the cost',
          description: 'Pick the renewal option available to you (typically 3 or 5 years). You see the full, itemised cost before you approve anything.',
        },
        {
          title: 'Pay online',
          description: 'Pay securely by card or transfer. The amount you see at checkout is the amount you pay.',
        },
        {
          title: 'Capture/collection & reminders',
          description: 'Where biometrics or card collection is required, we guide you on the capture/collection step. Motoka stores the new expiry and reminds you well before it lapses again.',
        },
      ]}
      table={{
        title: "Estimated driver's licence renewal cost (Nigeria)",
        caption:
          "Official FRSC renewal fees depend on the validity period you choose (commonly 3 or 5 years) and can change. The ranges below are indicative estimates to help you plan — your exact total is confirmed at checkout.",
        head: ['Renewal option', 'What to expect', 'Estimated cost (from)'],
        rows: [
          ['3-year renewal', "Standard driver's licence validity (3 years)", 'From ₦15,000'],
          ['5-year renewal', "Extended driver's licence validity (5 years)", 'From ₦21,000'],
          ['Replacement / reissue (lost or damaged)', 'Reprint of an existing licence record (requirements vary)', 'From ₦12,000'],
        ],
        note:
          "Disclaimer: these prices are estimates and may increase or decrease at checkout based on the validity option, your state/processing centre and current official fees. Where a physical biometric capture or card collection applies, that step follows FRSC/state procedure. Your exact total is confirmed before you pay.",
      }}
      sections={[
        {
          heading: "Driver's licence vs vehicle licence — they are different",
          paragraphs: [
            "A Nigerian driver's licence is a federal document issued through the FRSC that permits you to drive. It is tied to you (the person), not to a specific car, and it expires on its own schedule — usually 3 or 5 years from issue. That makes it different from your vehicle licence, which is an annual road tax tied to the vehicle.",
            "Many drivers renew their vehicle papers and forget the driver's licence because the dates don't line up. Motoka tracks both separately so neither lapses unnoticed.",
          ],
        },
        {
          heading: 'What you need to renew',
          list: [
            "Your current or expired driver's licence number (or the details on the card).",
            'A valid means of identification where required for verification.',
            "Payment for the renewal fee (you'll see the exact amount before paying).",
            'For a first-time licence (not a renewal) or where your record requires it, biometric capture at an FRSC/BIR centre is part of the process.',
          ],
          paragraphs: [
            'Requirements can vary slightly by state and by whether you are renewing, reissuing a lost card, or updating details. Motoka confirms what applies to your case before you pay.',
          ],
        },
        {
          heading: 'Driving with an expired licence',
          paragraphs: [
            "Driving on an expired driver's licence is an offence and can lead to fines or your vehicle being delayed at a checkpoint. The good news: an expired licence can still be renewed — you don't start from scratch — but it's faster and cheaper to renew before it lapses.",
            'If your licence has been expired for a long time or your details have changed, the issuing office may require extra verification. Start the renewal early so there’s time to resolve anything that comes up.',
          ],
        },
        {
          heading: 'How Motoka helps',
          paragraphs: [
            'Motoka reduces the back-and-forth: you confirm your details and pay online with transparent pricing, and we guide the processing through the proper channel. Where a physical capture or card pickup is mandatory, we tell you exactly what to do and where — so you only visit a centre when it is genuinely required.',
            'Once renewed, the new expiry date is saved and Motoka sends reminders weeks ahead, so next time it does not become a last-minute rush.',
          ],
        },
      ]}
      benefits={[
        { title: 'Start online, skip the queue', description: 'Begin the renewal from your phone and avoid unnecessary trips to the licensing office.' },
        { title: 'Transparent pricing', description: 'You see the full cost before you approve anything — no surprise charges.' },
        { title: 'Guidance on capture/collection', description: 'If biometrics or pickup is required, we tell you the exact next step.' },
        { title: 'Separate expiry reminders', description: "Motoka tracks your driver's licence apart from your vehicle papers and alerts you weeks ahead." },
      ]}
      faqs={[
        {
          q: "How much does it cost to renew a driver's licence in Nigeria?",
          a: "It depends on the validity period (commonly 3 or 5 years) and current official fees. As a guide, a 3-year renewal is often from around ₦15,000 and a 5-year renewal from around ₦21,000, but fees can change. Motoka shows your exact, itemised total at checkout before you pay (estimates may increase or decrease).",
        },
        {
          q: "How long does driver's licence renewal take?",
          a: 'Processing times vary by state and by whether biometric capture or card production is required. Starting online with Motoka speeds up the paperwork; where a physical capture/collection step applies, the total time depends on that appointment.',
        },
        {
          q: 'Can I renew an expired driver’s licence?',
          a: 'Yes. An expired licence can usually be renewed through the normal process. Renew as early as possible to avoid fines or delays at checkpoints, and be aware that long-expired records or changed details may need extra verification.',
        },
        {
          q: 'Do I have to visit an FRSC or BIR office?',
          a: 'You can start and pay online with Motoka. However, biometric capture or physical card collection is sometimes required by FRSC/state procedure — if it applies to you, Motoka will tell you exactly what to do so you only go when necessary.',
        },
        {
          q: "Is my driver's licence the same as my vehicle licence?",
          a: "No. Your driver's licence (FRSC, tied to you, typically 3–5 years) is different from your vehicle licence (an annual road tax tied to the car). Motoka can track and help you renew both, but they expire separately.",
        },
        {
          q: 'Will I be reminded before it expires?',
          a: "Yes. Motoka stores your driver's licence expiry separately from your vehicle documents and sends reminders weeks in advance.",
        },
      ]}
      ctaText="Start Renewal"
      ctaTo="/#top"
    />
  )
}
