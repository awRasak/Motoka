import { useParams, Navigate, Link } from 'react-router-dom'
import ServicePageTemplate from '../ServicePageTemplate'
import { getStateBySlug } from '../../../Data/states'

export default function StatePage() {
  const { slug } = useParams()
  const state = getStateBySlug(slug)

  if (!state) return <Navigate to="/" replace />

  return (
    <ServicePageTemplate
      seoTitle={`Renew Vehicle Licence & Papers in ${state.name} Online (2026) | Motoka`}
      seoPath={`/states/${state.slug}`}
      seoDescription={`How to renew your vehicle licence, road worthiness and insurance in ${state.name}: where to process, what it costs (estimated), and how to renew online with Motoka.`}
      eyebrow={state.name}
      h1={`Vehicle licence and papers renewal in ${state.name}`}
      subcopy={state.intro}
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'States', path: `/states/${state.slug}` },
        { name: state.name, path: `/states/${state.slug}` },
      ]}
      service={{
        name: `Vehicle papers renewal in ${state.name}`,
        serviceType: 'Vehicle document renewal',
        priceRange: '33000-70000',
      }}
      lastUpdated="7 November 2026"
      author="the Motoka Renewals Team"
      steps={[
        {
          title: 'Enter your plate number',
          description: `We confirm your ${state.name}-registered vehicle record so the renewal matches the right car.`,
        },
        {
          title: 'Select documents & see the cost',
          description: 'Choose vehicle licence, road worthiness, insurance (and any other papers due). You see the full, itemised cost before you approve.',
        },
        {
          title: 'Pay & we process',
          description: `Motoka handles the processing through the proper channel for ${state.name}, including guidance where an inspection or in-person step applies.`,
        },
        {
          title: 'Track & get reminders',
          description: 'Your renewed documents are stored in one place and Motoka reminds you before the next expiry.',
        },
      ]}
      table={{
        title: `Estimated cost to renew vehicle papers in ${state.name}`,
        caption:
          `Indicative "from" estimates for renewing the 4 core documents (Vehicle Licence, Road Worthiness, Third-Party Insurance and Proof of Ownership) for a ${state.name}-registered vehicle. Final amounts vary by vehicle type, engine size and the documents you select.`,
        head: ['Vehicle type', 'What’s included', 'Estimated price (from)'],
        rows: [
          ['Saloon cars', 'Vehicle Licence + Road Worthiness + Third-Party Insurance + Proof of Ownership', 'From ₦33,000'],
          ['SUVs / Jeeps / Space buses', 'Vehicle Licence + Road Worthiness + Third-Party Insurance + Proof of Ownership', 'From ₦33,000'],
          ['Pickup / bus / commercial', 'Core 4 documents (+ Hackney Permit where required)', 'From ₦36,000'],
          ['Truck / lorry', 'Core 4 documents (+ Hackney Permit where required)', 'From ₦40,000'],
        ],
        note:
          `Disclaimer: these prices are estimates and may increase or decrease at checkout based on your vehicle type, engine size, ${state.name} requirements and the documents you select. Your exact total is confirmed before you pay.`,
      }}
      sections={[
        {
          heading: `How vehicle papers renewal works in ${state.name}`,
          paragraphs: [
            state.authority,
            `Processing route: ${state.portal} Motoka works through the appropriate licensed channel for your ${state.name}-registered vehicle, so you don’t have to figure out which office or portal handles your file.`,
            state.note,
          ],
        },
        {
          heading: 'Documents you can renew',
          list: [
            'Vehicle licence (annual road tax for the vehicle).',
            'Road worthiness certificate (usually requires a vehicle inspection).',
            'Motor insurance (at least third-party, the legal minimum).',
            'Other vehicle papers where applicable (e.g. proof of ownership, hackney permit for commercial use).',
          ],
          paragraphs: [
            'Vehicle licence and road worthiness are separate from your insurance policy and from your driver’s licence (which is tied to you, not the car). Motoka lets you select exactly what’s due and shows one itemised total.',
          ],
        },
        {
          heading: 'Renewing an expired licence in ' + state.name,
          paragraphs: [
            'If your vehicle licence or road worthiness has expired, you can still renew — but driving with expired papers can lead to fines or delays at checkpoints. The sooner you renew, the easier it is to avoid penalties.',
            `Start the renewal online with Motoka and we’ll guide you through any ${state.name}-specific step (including inspection, if required) so the process doesn’t stall.`,
          ],
        },
        {
          heading: 'Cost, timing and what to expect',
          paragraphs: [
            <>
              Renewal costs depend on your vehicle type, engine size and the documents you select, and they can change. For a detailed breakdown of how vehicle licence costs work across Nigeria, see our{' '}
              <Link to="/renew/vehicle-license" style={{ color: '#2389e3', textDecoration: 'underline' }}>
                vehicle licence renewal cost guide
              </Link>
              . All figures shown are estimates — your exact total is confirmed at checkout before you pay.
            </>,
            'Processing time varies by document and by whether an inspection is required. Motoka tracks the order and notifies you as it moves forward.',
          ],
        },
      ]}
      benefits={[
        { title: `Built for ${state.name} drivers`, description: `Handled through the proper channel for ${state.name}-registered vehicles, including ${state.cities}.` },
        { title: 'No office visits to start', description: 'Begin the renewal from your phone and only do an in-person step if it’s genuinely required.' },
        { title: 'Transparent pricing', description: 'See an itemised estimate before you pay — your exact total is confirmed at checkout.' },
        { title: 'Renewal reminders', description: 'Motoka stores your new expiry dates and alerts you weeks ahead next time.' },
      ]}
      faqs={[
        {
          q: `How much is vehicle licence renewal in ${state.name}?`,
          a: `It depends on your vehicle type, engine size and the documents you renew. As an estimate, renewing the 4 core papers (vehicle licence, road worthiness, third-party insurance and proof of ownership) often starts from around ₦33,000 for many cars and SUVs, and more for commercial vehicles — but prices may increase or decrease at checkout. Motoka shows your exact, itemised total before you pay.`,
        },
        {
          q: `Can I renew my vehicle papers online in ${state.name}?`,
          a: `Yes. You can start the renewal online with Motoka. Some steps (like a road worthiness inspection) may require you to present the vehicle in person — if that applies in ${state.name}, Motoka tells you exactly what to do.`,
        },
        {
          q: `Where do I renew vehicle papers in ${state.name}?`,
          a: `Renewals are processed through ${state.portal} Motoka routes your ${state.name} renewal through the appropriate licensed channel so you don’t have to navigate the offices or portals yourself.`,
        },
        {
          q: `Can I renew an expired vehicle licence in ${state.name}?`,
          a: `Yes. Expired vehicle papers can still be renewed, but you should do it promptly to avoid fines or issues at checkpoints. Motoka handles expired renewals in the same flow and flags any extra step your case needs.`,
        },
        {
          q: 'Do I need a road worthiness inspection?',
          a: `In most cases, road worthiness requires a vehicle inspection. The exact requirement depends on your vehicle and ${state.name}’s process. Motoka will tell you if an inspection applies and guide you on the next step.`,
        },
      ]}
      ctaText={`Renew in ${state.name}`}
      ctaTo="/#top"
    />
  )
}
