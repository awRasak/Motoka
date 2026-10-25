import ServicePageTemplate from '../ServicePageTemplate'

export default function RoadWorthinessRenewalPage() {
  return (
    <ServicePageTemplate
      seoTitle="Road Worthiness Certificate Renewal Online Nigeria | Motoka"
      seoPath="/renew/road-worthiness"
      seoDescription="Skip the VIO queue. Renew your road worthiness certificate online with Motoka and get a verified digital copy sent straight to your phone."
      eyebrow="Road Worthiness"
      h1="Road worthiness certificate renewal, without the VIO queue"
      subcopy="No more waking up early to beat the line at the VIO office. Submit your vehicle details online, and Motoka's network handles your inspection booking and certificate renewal end to end."
      steps={[
        { title: 'Submit vehicle details', description: 'Plate number, vehicle type, and current road worthiness status.' },
        { title: 'We book your inspection', description: 'Motoka schedules and coordinates the inspection slot on your behalf.' },
        { title: 'Get your certificate', description: 'A verified digital copy of your road worthiness certificate lands in your wallet.' },
      ]}
      benefits={[
        { title: 'No early-morning queue', description: 'Book and track your inspection from your phone instead of standing in line.' },
        { title: 'Booking handled for you', description: 'Motoka coordinates the inspection slot — you just show up.' },
        { title: 'Digital copy, always on hand', description: 'Your certificate is stored in your Motoka wallet for any checkpoint.' },
        { title: 'Lagos renewal follow-up', description: 'Lagos renewals include a one-time 30-day window to complete VIO inspection — we handle the booking and track your compliance.' },
        { title: 'Renewal reminders', description: 'Get notified before your road worthiness certificate lapses.' },
      ]}
      faqs={[
        {
          q: 'Do I still need a physical inspection for road worthiness renewal?',
          a: 'Yes — road worthiness certification requires a vehicle inspection. Motoka books and coordinates that slot for you so you skip the queue.',
        },
        {
          q: 'How long is a road worthiness certificate valid for?',
          a: 'Validity depends on your vehicle category and state, but Motoka tracks your specific expiry date and reminds you before it lapses.',
        },
        {
          q: 'What makes Lagos road worthiness renewals different?',
          a: 'In Lagos, you must complete a one-time VIO (Vehicle Inspection Office) inspection within 30 days after payment. Failure to complete the inspection within this window invalidates the referral document. Motoka handles all of this — from booking your inspection to tracking the 30-day deadline — so you can focus on driving your business.',
        },
      ]}
    />
  )
}
