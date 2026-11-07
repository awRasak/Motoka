import ServicePageTemplate from '../ServicePageTemplate'

// Roadworthiness involves a physical inspection (VIS/VIO/computerised centre)
// in most states — it's not "payment only". Keep cost/timing guidance honest
// and state-variable; confirm at checkout.
export default function RoadWorthinessRenewalPage() {
  return (
    <ServicePageTemplate
      seoTitle="Road Worthiness Certificate Renewal in Nigeria — Cost & Inspection (2026) | Motoka"
      seoPath="/renew/road-worthiness"
      seoDescription="How to renew a road worthiness certificate in Nigeria: inspection requirements, what it costs, how long it takes, and how to avoid the VIO/VIS queue. Renew with Motoka."
      eyebrow="Road Worthiness"
      h1="Renew your road worthiness certificate in Nigeria"
      subcopy="A road worthiness certificate confirms your vehicle is safe to be on the road — and in most states it involves a physical inspection, not just a payment. Motoka helps you book, process and track the renewal so you spend less time in the VIO/VIS queue."
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Renewals', path: '/renew/vehicle-license' },
        { name: 'Road Worthiness', path: '/renew/road-worthiness' },
      ]}
      service={{
        name: 'Road worthiness certificate renewal',
        serviceType: 'Vehicle roadworthiness renewal',
        priceRange: '5000-20000',
      }}
      lastUpdated="7 November 2026"
      author="the Motoka Renewals Team"
      steps={[
        {
          title: 'Submit your vehicle details',
          description: 'Share your plate number and vehicle details so we can confirm the record and what your state requires.',
        },
        {
          title: 'Inspection (where required)',
          description: 'Most private vehicles need a periodic inspection at a VIO/VIS or approved testing centre. Motoka guides the booking/coordination so you know where to go and when.',
        },
        {
          title: 'Pay & process the certificate',
          description: 'You see the full cost before you pay. Once the inspection/result is cleared, the certificate is processed through the proper channel.',
        },
        {
          title: 'Get your certificate & reminders',
          description: 'Your renewed road worthiness record is stored, and Motoka reminds you ahead of the next expiry.',
        },
      ]}
      table={{
        title: 'Estimated road worthiness cost (guide)',
        caption:
          'Road worthiness fees vary by state and vehicle category, and a physical inspection is usually part of the process. The figures below are indicative estimates (not a fixed quote).',
        head: ['Vehicle category', 'Inspection', 'Estimated cost (from)'],
        rows: [
          ['Private car / saloon', 'Typically required (periodic)', 'From ₦5,000'],
          ['SUV / Jeep', 'Typically required (periodic)', 'From ₦6,500'],
          ['Commercial vehicle (bus/taxi/truck)', 'Required (often more frequent)', 'From ₦8,000'],
          ['Motorcycle / tricycle', 'Varies by state', 'From ₦3,500'],
        ],
        note:
          'Disclaimer: these prices are estimates and may increase or decrease at checkout based on your vehicle type, engine size/category, state of renewal and inspection requirements. Your exact total is confirmed before you pay. Road worthiness is separate from (but often renewed alongside) your vehicle licence.',
      }}
      sections={[
        {
          heading: 'What a road worthiness certificate is',
          paragraphs: [
            'A road worthiness certificate shows that your vehicle has met the minimum safety standard to be driven on public roads. It is usually issued after a vehicle inspection (by VIO, VIS or a state-approved/computerised testing centre, depending on the state) and it is checked alongside your vehicle licence at road stops.',
            'Because an inspection is involved, road worthiness is not always a “pay and download” document. The timing depends on getting the vehicle inspected and the result cleared.',
          ],
        },
        {
          heading: 'How often you need it',
          paragraphs: [
            'Renewal frequency is set by regulation and can differ by vehicle use: private vehicles are commonly inspected annually, while commercial vehicles are inspected more frequently (often every six months). Your state and vehicle category determine the exact schedule — check your current certificate’s expiry and renew before it lapses.',
          ],
        },
        {
          heading: 'If it has expired (or your car fails inspection)',
          paragraphs: [
            'Driving without a valid road worthiness certificate can attract fines and may cause delays at checkpoints. If the certificate has expired, you can still renew it, but an inspection will be required and you should resolve it promptly.',
            'If a vehicle fails inspection, the centre will point out the faults (for example brakes, lights, tyres or emissions). Fix the issues and re-present the vehicle; the certificate is issued once it passes. Motoka helps you understand the next step so the renewal does not stall.',
          ],
        },
        {
          heading: 'Renew it together with your vehicle licence',
          paragraphs: [
            'Vehicle licence and road worthiness are separate documents but they expire on similar cycles and are checked together. Renewing them in one go saves repeat visits and reduces the chance of one lapsing while the other is valid. On Motoka you can select the documents you need and see the combined, itemised cost before paying.',
          ],
        },
      ]}
      benefits={[
        { title: 'Less time in the queue', description: 'Start online and get clear guidance on the inspection/renewal steps for your state.' },
        { title: 'Know if inspection is needed', description: 'We tell you upfront when a physical inspection applies and how to handle it.' },
        { title: 'Transparent pricing', description: 'See the full cost before you pay — estimates are clearly labelled.' },
        { title: 'Renewal reminders', description: 'Motoka alerts you before your road worthiness (and other papers) expire again.' },
      ]}
      faqs={[
        {
          q: 'How much does a road worthiness certificate cost in Nigeria?',
          a: 'It varies by state and vehicle category (and whether an inspection/test fee applies). As a guide, many private cars renew from around ₦5,000–₦10,000+, while larger or commercial vehicles can cost more. These are estimates and may increase or decrease at checkout — Motoka shows your exact, itemised total before you pay.',
        },
        {
          q: 'Does my car need a physical inspection to renew road worthiness?',
          a: 'In most cases, yes — road worthiness is confirmed through a vehicle inspection at a VIO/VIS or approved testing centre. The exact process depends on your state and vehicle type. Motoka tells you what applies to your vehicle and helps coordinate the step.',
        },
        {
          q: 'How long does road worthiness renewal take?',
          a: 'Payment/processing can be quick, but the total time usually depends on the inspection slot and clearing the result. Starting early (before expiry) gives you room to book and, if needed, fix any faults found during inspection.',
        },
        {
          q: 'Can I renew road worthiness without renewing my vehicle licence?',
          a: 'They are separate documents with separate fees, so you can handle them individually — but because both are checked together and often expire around the same time, renewing them together is usually easier. Motoka lets you select exactly which documents to renew.',
        },
        {
          q: 'What happens if my vehicle fails the road worthiness inspection?',
          a: 'You’ll be told what needs fixing (e.g. lights, brakes, tyres, emissions). Repair the issues and take the vehicle back for re-inspection; the certificate is issued once it passes. Motoka can guide you on the re-inspection step.',
        },
      ]}
      ctaText="Renew Road Worthiness"
      ctaTo="/#top"
    />
  )
}
