import ServicePageTemplate from '../ServicePageTemplate'

// /renew/vehicle-license is the money page for the "renew vehicle licence"
// cluster. It is written to out-answer the official portals and the long-form
// content sites that currently hold the top spots: real fee bands, the fines,
// the identity rules, and which portal applies in which state — then the
// Motoka flow on top. All statutory figures are indicative and state-variable;
// the table and copy say so rather than promising one nationwide price.
export default function VehicleLicenseRenewalPage() {
  return (
    <ServicePageTemplate
      seoTitle="Renew Vehicle Licence Online in Nigeria — Cost, Steps & Fines (2026) | Motoka"
      seoPath="/renew/vehicle-license"
      seoDescription="How to renew a vehicle licence online in Nigeria: what it costs by vehicle type, the documents you need, expired-licence fines, the NIN/Payer ID rule, and which state portal applies. Renew in minutes with Motoka."
      eyebrow="Vehicle Licence Renewal"
      h1="Renew your vehicle licence online in Nigeria"
      subcopy="Skip the queue at the licensing office. Enter your plate number, see the full cost before you pay, and Motoka's licensed agent network processes the renewal — most are completed in 24–48 hours."
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Renewals', path: '/renew/vehicle-license' },
        { name: 'Vehicle Licence', path: '/renew/vehicle-license' },
      ]}
      service={{
        name: 'Vehicle licence renewal',
        serviceType: 'Vehicle document renewal',
        priceRange: '33000-70000',
      }}
      lastUpdated="7 November 2026"
      author="the Motoka Renewals Team"
      steps={[
        {
          title: 'Enter your plate number',
          description: 'We pull your existing vehicle licence record so you don’t have to re-type anything, and confirm it’s the right car before you pay.',
        },
        {
          title: 'Choose documents & see the cost',
          description: 'Pick vehicle licence and anything else due — roadworthiness, insurance, proof of ownership. You see the government fee plus our service fee before approving.',
        },
        {
          title: 'Pay online',
          description: 'Pay by card or transfer. No account needed to start — guest renewal works from this page.',
        },
        {
          title: 'We process & you track',
          description: 'Our licensed agents submit and follow up with the issuing office. Track the order until it completes; the renewed copy lands in your Motoka wallet.',
        },
      ]}
      table={{
        title: 'Estimated cost to renew your vehicle papers (4 documents)',
        caption:
          'Covers the 4 core documents: Vehicle Licence, Road Worthiness, Third-Party Insurance and Proof of Ownership. Prices are shown as “from” because the final amount changes with your engine size and car type (and your state).',
        head: ['Vehicle type', 'What’s included', 'Estimated price (from)'],
        rows: [
          [
            'Saloon cars (e.g. Corolla, Yaris, Camry, Accord)',
            'Vehicle Licence + Road Worthiness + Third-Party Insurance + Proof of Ownership',
            'From ₦33,000',
          ],
          [
            'SUVs / Jeeps / Space buses',
            'Vehicle Licence + Road Worthiness + Third-Party Insurance + Proof of Ownership',
            'From ₦33,000',
          ],
          [
            'Pickup / bus / commercial vehicle',
            'Vehicle Licence + Road Worthiness + Third-Party Insurance + Proof of Ownership (+ Hackney Permit where required)',
            'From ₦36,000',
          ],
          [
            'Truck / lorry',
            'Vehicle Licence + Road Worthiness + Third-Party Insurance + Proof of Ownership (+ Hackney Permit where required)',
            'From ₦40,000',
          ],
        ],
        note:
          'Disclaimer: these prices are estimates and may increase or decrease at checkout based on your vehicle type, engine size, state of renewal and the documents you select. Your exact total is confirmed before you pay.',
      }}
      sections={[
        {
          heading: 'What you are actually renewing',
          paragraphs: [
            'A Nigerian vehicle licence is the annual road tax that lets a specific car be on the road. It is separate from your driver’s licence (which is tied to you) and from third-party insurance (which is a separate policy). Most owners renew the vehicle licence and the roadworthiness certificate together, because both expire annually and both are checked at checkpoints.',
            'Roadworthiness is the part that is more than a payment: private vehicles are physically inspected once a year (commercial vehicles every six months), and the inspection result is recorded against the vehicle before a certificate can be issued. That is why a “renewal” can involve an inspection slot, not just a receipt.',
          ],
        },
        {
          heading: 'Documents you need',
          list: [
            'Your plate number (this is enough to start on Motoka — we look the vehicle up).',
            'The current or most recent vehicle licence / proof of ownership details to confirm the record matches.',
            'For Lagos renewals from 1 September 2025: a Payer ID, NIN, or NIN-linked phone number is mandatory on every renewal and new registration.',
            'If the vehicle is commercial: hackney permit details, and the driver’s LASDRI certification where applicable.',
          ],
          paragraphs: [
            'You do not need to upload a stack of papers to begin. The plate lookup retrieves the registered record; Motoka only asks for more if your specific case needs it (for example a name change or a transferred vehicle).',
          ],
        },
        {
          heading: 'If your licence has already expired',
          paragraphs: [
            'There is no statutory grace period in Nigeria — the moment the licence lapses you are driving without a valid licence. You can still renew, and the process is the same, but the expired period attracts a fine.',
            'Indicative penalties: an expired vehicle licence carries a fine of about ₦25,000 and an expired roadworthiness certificate about ₦15,000. If the vehicle is impounded, expect a release fee (around ₦30,000) plus a daily storage charge on top of the fine and the outstanding licence fee.',
            'The practical move is to renew immediately rather than wait: the fines do not grow by waiting, but the risk of impoundment does. Motoka handles expired renewals in the same flow and flags anything extra your state requires.',
          ],
        },
        {
          heading: 'Which portal applies in your state',
          paragraphs: [
            'Nigeria has no single national renewal portal — each state runs or commissions its own. Knowing which one governs your plate is step one:',
          ],
          list: [
            'Lagos — AutoReg customer portal (portal.autoreg.ng), run with the Lagos State MVAA.',
            'FCT (Abuja) — DRTS self-service portal (selfservice.fctevreg.com).',
            'States using a Board of Internal Revenue — e.g. Lagos revenue via LIRS (igr.ng); others via their state BIR or Motor Licensing Authority.',
            'Everywhere else — Motoka processes through the licensed agent network for your state, so you don’t need to know which office owns the file.',
          ],
        },
        {
          heading: 'Motoka vs doing it yourself vs an agent',
          paragraphs: [
            'Doing it yourself on the state portal is cheapest in fees but costs you time: account setup, plate/file-ID lookups, inspection slots, and often a physical collection visit. Roadside agents are fast but opaque — you rarely see the fee breakdown and have no receipt trail.',
            'Motoka sits between the two: you pay the government fee plus a clearly shown service fee, the work is done by licensed, MVAA-certified agents, and every step is tracked in the app with a verifiable digital copy at the end. No queue, no touts, and a reminder before next year’s expiry.',
          ],
        },
        {
          heading: 'Renew early — the reminder advantage',
          paragraphs: [
            'Enforcement has tightened and inspection lanes are busiest in the last week of each month. Starting about a month before expiry gives you buffer for inspections and processing without risking a lapse.',
            'On Motoka the new expiry is stored automatically and reminders fire weeks ahead — not the day before — so next year renews itself before it becomes a fine.',
          ],
        },
      ]}
      benefits={[
        { title: 'No office visits', description: 'The entire renewal happens from your phone — no queue, no touts.' },
        { title: 'Verified against real records', description: 'Every renewal is checked against the issuing agency, not just a printout.' },
        { title: 'Transparent pricing', description: 'Government fee plus service fee, shown before you approve anything.' },
        { title: 'Deadline reminders', description: 'Motoka alerts you weeks ahead of your next expiry, not the day before.' },
        { title: 'MVAA-certified network', description: 'Processed through a licensed, certified agent network — not a roadside middleman.' },
      ]}
      faqs={[
        {
          q: 'How long does vehicle licence renewal take through Motoka?',
          a: 'Most renewals complete within 24–48 hours of payment, depending on your state licensing office. Renewals that need a physical roadworthiness inspection take as long as the inspection slot you book.',
        },
        {
          q: 'How much does it cost to renew vehicle papers in Nigeria?',
          a: 'It depends on your vehicle type, engine size, state and the documents you select. As an estimate, renewing the 4 core documents (Vehicle Licence, Road Worthiness, Third-Party Insurance and Proof of Ownership) starts from around ₦33,000 for most saloon cars and SUVs, and from around ₦36,000–₦40,000 for commercial vehicles and trucks (commercial vehicles may also need a Hackney Permit). These are estimates and may increase or decrease at checkout — Motoka shows your exact, itemised total before you pay.',
        },
        {
          q: 'Can I renew without creating an account?',
          a: 'Yes. Guest renewal starts from this page: enter your plate, choose documents, pay. You can create an account afterwards if you want reminders and a digital wallet copy.',
        },
        {
          q: 'Can I renew an already-expired vehicle licence?',
          a: 'Yes. An expired licence renews through the same flow; the expired period attracts a fine (about ₦25,000 for the licence) but you do not restart the process. Renew as soon as possible — the risk of impoundment grows the longer you wait.',
        },
        {
          q: 'Do I need my NIN to renew?',
          a: 'For Lagos renewals from 1 September 2025, a Payer ID, NIN, or NIN-linked phone number is mandatory on every renewal and new registration. Other states vary; Motoka tells you if your state requires it.',
        },
        {
          q: 'Is roadworthiness included in the renewal?',
          a: 'They are separate charges usually paid together. Roadworthiness requires a physical inspection (yearly for private vehicles, every six months for commercial), so it can add an inspection step beyond the payment.',
        },
        {
          q: 'Is Motoka the official government portal?',
          a: 'No. The FRSC and state motor registries remain the statutory bodies. Motoka is a licensed private processor that submits and follows up your renewal on your behalf so you don’t have to queue.',
        },
        {
          q: 'Which states does Motoka cover?',
          a: 'Motoka processes renewals across its licensed agent network in 17+ states including Lagos, Ogun, Oyo, Osun, Edo, Rivers and the FCT. Choose your state of renewal at checkout.',
        },
      ]}
      ctaText="Renew Now"
      ctaTo="/#top"
    />
  )
}
