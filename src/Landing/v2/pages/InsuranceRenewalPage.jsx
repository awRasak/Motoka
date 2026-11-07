import ServicePageTemplate from '../ServicePageTemplate'

// Keep claims accurate: third-party is the legal minimum; comprehensive is
// optional and priced by risk. Don't promise unverifiable "minutes" SLAs;
// costs vary by vehicle/value/insurer — show estimates + checkout disclaimer.
export default function InsuranceRenewalPage() {
  return (
    <ServicePageTemplate
      seoTitle="Vehicle Insurance Renewal in Nigeria — Third-Party Cost & Cover (2026) | Motoka"
      seoPath="/renew/insurance"
      seoDescription="Renew your vehicle insurance in Nigeria online. Understand third-party vs comprehensive cover, what affects the price, and avoid driving uninsured. Renew with Motoka."
      eyebrow="Insurance Renewal"
      h1="Renew your vehicle insurance in Nigeria before it lapses"
      subcopy="At minimum, every vehicle on Nigerian roads must carry valid third-party motor insurance. It’s also the document that’s easiest to forget because it runs on its own policy date. Motoka helps you renew on time and keeps the certificate with your other vehicle papers."
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Renewals', path: '/renew/vehicle-license' },
        { name: 'Insurance', path: '/renew/insurance' },
      ]}
      service={{
        name: 'Vehicle insurance renewal',
        serviceType: 'Motor vehicle insurance renewal',
        priceRange: '15000-150000',
      }}
      lastUpdated="7 November 2026"
      author="the Motoka Renewals Team"
      steps={[
        {
          title: 'Enter your vehicle details',
          description: 'Provide your plate number and basic vehicle details (and current policy info if you have it) so we can match the right cover.',
        },
        {
          title: 'Review cover & price',
          description: 'Confirm the cover type and terms. You see the cost before you pay — no surprises.',
        },
        {
          title: 'Pay securely',
          description: 'Pay online by card or transfer. Your exact total is confirmed at checkout.',
        },
        {
          title: 'Get your certificate & reminders',
          description: 'Your insurance certificate is issued and stored with your documents, and Motoka reminds you before the next expiry.',
        },
      ]}
      table={{
        title: 'Estimated vehicle insurance cost (guide)',
        caption:
          'Insurance pricing depends on the cover type, your vehicle, its value/usage and the underwriting insurer. The ranges below are indicative estimates to help you plan.',
        head: ['Cover type', 'What it covers (summary)', 'Estimated cost (from)'],
        rows: [
          ['Third-party (legal minimum)', 'Liability for injury/damage you cause to others; does not cover your own vehicle', 'From ₦15,000'],
          ['Third-party, fire & theft', 'Third-party liability plus limited cover for your vehicle (fire/theft)', 'From ₦30,000'],
          ['Comprehensive', 'Broader cover including damage to your own vehicle (terms/excess apply)', 'Priced by vehicle value (often a % of value)'],
        ],
        note:
          'Disclaimer: these prices are estimates and may increase or decrease at checkout based on your vehicle type, value, usage, cover level and the issuing insurer’s terms. Always review the policy schedule/exclusions. Your exact total is confirmed before you pay.',
      }}
      sections={[
        {
          heading: 'Third-party vs comprehensive — what’s the difference?',
          paragraphs: [
            'Third-party motor insurance is the legal minimum in Nigeria: it covers your liability if you injure someone or damage their property. It does not pay to repair your own car. Comprehensive cover is optional and wider — it can cover damage to your own vehicle as well — but it costs more and is priced around the vehicle’s value and risk.',
            'The right choice depends on the car’s value, how you use it, and what risk you want to carry yourself. Whichever you choose, make sure the policy is genuine and verifiable.',
          ],
        },
        {
          heading: 'What affects the price',
          list: [
            'Cover type (third-party vs third-party fire & theft vs comprehensive).',
            'Vehicle type, age, engine size and value.',
            'How the vehicle is used (private vs commercial) and where it is garaged/operated.',
            'The insurer’s underwriting terms and any excess/deductible on the policy.',
          ],
        },
        {
          heading: 'Don’t drive uninsured',
          paragraphs: [
            'Driving without valid insurance is illegal and exposes you to fines and to paying out of pocket if there’s an accident. Because insurance expires on its own date (separate from your vehicle licence and road worthiness), it’s easy to miss — renew before the policy lapses.',
            'Keep a copy of your certificate (digital or printed) handy. Motoka stores your insurance alongside your other vehicle documents so it’s easy to find when you need it.',
          ],
        },
        {
          heading: 'Renew insurance with your other papers',
          paragraphs: [
            'Insurance, vehicle licence and road worthiness are often checked together. Handling them in one place means fewer missed dates and one clear view of what’s due. On Motoka you can track each expiry separately and renew what you need with transparent pricing.',
          ],
        },
      ]}
      benefits={[
        { title: 'Stay legal, avoid lapses', description: 'Keep at least third-party cover active and get reminders before your policy expires.' },
        { title: 'Transparent pricing', description: 'See the cost before you pay; estimates are clearly labelled and confirmed at checkout.' },
        { title: 'Certificate in your wallet', description: 'Your insurance sits next to your licence and road worthiness in one place.' },
        { title: 'Issued through proper channels', description: 'Policies are arranged through licensed insurance partners with verifiable certificates.' },
      ]}
      faqs={[
        {
          q: 'How much is third-party vehicle insurance in Nigeria?',
          a: 'Third-party premiums vary by vehicle and insurer, but for many private vehicles they start from around ₦15,000 per year. The exact price depends on your vehicle type/usage and the issuing insurer. Motoka shows your exact, itemised total at checkout (estimates may increase or decrease).',
        },
        {
          q: 'Is third-party insurance compulsory in Nigeria?',
          a: 'Yes. At minimum, every vehicle used on Nigerian roads must have valid third-party motor insurance. Driving without it is illegal and can lead to fines and liability for damages out of pocket.',
        },
        {
          q: 'What’s the difference between third-party and comprehensive insurance?',
          a: 'Third-party covers damage or injury you cause to others (not your own car). Comprehensive is wider and can cover damage to your own vehicle too, subject to the policy terms and excess; it costs more and is usually priced based on the vehicle’s value.',
        },
        {
          q: 'How long does insurance renewal take?',
          a: 'Once your details are confirmed and payment is made, certificates are typically issued promptly, though timing can vary by insurer and case. Motoka keeps you updated and stores the certificate when it’s ready.',
        },
        {
          q: 'Can I renew insurance together with my vehicle licence and road worthiness?',
          a: 'Yes — and it’s a good idea because they’re checked together but expire on different dates. Motoka lets you track each document separately and renew what’s due with a clear, itemised total.',
        },
      ]}
      ctaText="Renew Insurance"
      ctaTo="/#top"
    />
  )
}
