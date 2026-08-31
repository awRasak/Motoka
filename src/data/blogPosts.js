// Data-driven blog posts — one route (/blog/:slug) + one render component
// (BlogPostPage.jsx) instead of a page file per post. Each entry is the full
// content for one post.
//
// A section is { title, body?, bullets?, steps?, note? } — `body` is a
// paragraph, `bullets` an unordered list, `steps` an ordered one, and `note`
// a highlighted callout. Any combination may appear in a single section, and
// they render in that order. Posts written before lists existed use `body`
// alone and are unaffected.
export const BLOG_POSTS = [
  {
    slug: 'vehicle-documents-checklist-nigeria',
    eyebrow: 'Driver Guides',
    title: 'What Documents Do You Need to Drive Legally in Nigeria? (2026 Guide)',
    seoTitle: 'What Documents Do You Need to Drive Legally in Nigeria? (2026 Guide) | Motoka',
    seoDescription:
      "A complete checklist of the vehicle documents Nigerian drivers legally need — driver's license, vehicle license, road worthiness, insurance, and more — and how to keep them all valid.",
    intro:
      "Getting stopped at a checkpoint and realizing a document expired months ago is one of the most common — and most avoidable — problems Nigerian car owners run into. Most people know they need \"their papers\" in order, but few can name all six documents off the top of their head. Here's the full list, what each one actually does, and why it matters.",
    sections: [
      {
        title: "1. Driver's License",
        body: "Your driver's license proves you're legally permitted to drive. It's renewable and tied to you personally, not your vehicle — so it stays valid even if you change cars.",
      },
      {
        title: '2. Vehicle License',
        body: "Sometimes called the vehicle particulars or road tax, this is tied to the vehicle itself and confirms it's registered and licensed to be on the road for the current period.",
      },
      {
        title: '3. Road Worthiness Certificate',
        body: 'Issued after a physical vehicle inspection (via the VIO), this confirms your car meets minimum safety standards — brakes, lights, tyres, and structural condition.',
      },
      {
        title: '4. Proof of Ownership / Vehicle Registration',
        body: "This document ties the vehicle to your name in the central motor registry. You need it for change-of-ownership transfers, and it protects you if a vehicle's origin is ever questioned.",
      },
      {
        title: '5. Third-Party Insurance',
        body: "Legally required for every vehicle on Nigerian roads. It covers damage or injury you cause to someone else — it doesn't cover your own vehicle, but driving without it is an offence.",
      },
      {
        title: '6. Number Plate & Registration',
        body: 'Your plate number needs to be correctly registered and match your vehicle license — a mismatch here is one of the most common reasons for checkpoint delays.',
      },
    ],
    closing:
      "The hard part usually isn't any single renewal — it's that six documents means six different expiry dates to track, often across different offices. Motoka keeps all of them in one encrypted wallet with reminders before anything lapses, and handles the renewal itself when it's time.",
    ctaText: 'See how license renewal works',
    ctaTo: '/renew/vehicle-license',
  },
  {
    slug: 'what-happens-license-expires',
    eyebrow: 'Driver Guides',
    title: 'What Happens If Your Vehicle License Expires in Nigeria?',
    seoTitle: 'What Happens If Your Vehicle License Expires in Nigeria? | Motoka',
    seoDescription:
      "Driving with an expired vehicle license in Nigeria can mean fines, checkpoint delays, or worse. Here's what actually happens, and how to fix it without starting over.",
    intro:
      "An expired vehicle license doesn't announce itself — your car still starts, still drives, still gets you where you're going. The problem only shows up the moment someone checks, usually a traffic officer at a checkpoint you didn't plan for.",
    sections: [
      {
        title: 'The immediate risk: fines and delays',
        body: 'Driving with an expired license exposes you to on-the-spot fines and, at minimum, a delay while an officer verifies your documents. How strictly this is enforced varies by state and checkpoint, but the risk exists every time you drive.',
      },
      {
        title: 'It compounds the longer you wait',
        body: "The most common consequence isn't a single dramatic incident — it's a slowly increasing renewal fee. Licensing offices generally charge more to renew a lapsed document than a current one, so a delay that felt harmless in month one gets more expensive in month six.",
      },
      {
        title: "It's not a restart",
        body: "A common misconception is that an expired document means starting the registration process from scratch. It doesn't. Renewing an expired vehicle license is usually just the normal renewal process plus the lapsed-fee difference — not a new application.",
      },
    ],
    closing:
      "If your license has already expired, the fix is the same either way: renew it. Motoka processes expired renewals the same way as on-time ones — enter your plate number, confirm your details, and pay the (slightly higher) fee. No separate process, no starting over.",
    ctaText: 'Renew an expired license',
    ctaTo: '/renew/vehicle-license',
  },
  {
    slug: 'how-to-renew-vehicle-license-online-nigeria',
    eyebrow: 'Driver Guides',
    title: 'How to Renew Your Vehicle License Online in Nigeria (Step-by-Step)',
    seoTitle: 'How to Renew Your Vehicle License Online in Nigeria (Step-by-Step) | Motoka',
    seoDescription:
      'A step-by-step walkthrough of renewing your Nigerian vehicle license online through Motoka — from entering your plate number to receiving your renewed license.',
    intro:
      'Renewing a vehicle license used to mean a physical trip to a licensing office, a queue, and often a return visit for a document that wasn\'t ready. Here\'s what the process looks like when it\'s done online instead.',
    sections: [
      {
        title: 'Step 1: Enter your plate number',
        body: "Motoka looks up your existing vehicle license details from your plate number, so you're not re-typing information that's already on record.",
      },
      {
        title: 'Step 2: Confirm your details',
        body: "Review your vehicle and license details for accuracy. This is also where you'd correct anything that's changed since your last renewal.",
      },
      {
        title: 'Step 3: See the fee breakdown and pay',
        body: "You'll see the full cost split out — the government fee plus Motoka's service fee — before approving anything. No surprise charges added afterward.",
      },
      {
        title: 'Step 4: Receive your renewed license',
        body: 'Once processed, a verified digital copy is stored in your Motoka wallet, ready to show at any checkpoint — alongside the physical document where applicable.',
      },
    ],
    closing:
      'The entire process is designed to remove the office visit, not just move the paperwork online — most renewals are completed within 24–48 hours of submitting your details.',
    ctaText: 'Start your renewal',
    ctaTo: '/renew/vehicle-license',
  },
  {
    slug: 'vehicle-license-renewal-ogun-state-guide',
    eyebrow: 'State Guides',
    title: 'Vehicle License Renewal in Ogun State: Everything You Need to Know',
    seoTitle: 'Vehicle License Renewal in Ogun State: Everything You Need to Know | Motoka',
    seoDescription:
      'Everything Ogun State vehicle owners need to know about renewing their license and road worthiness certificate — including how to do it online without visiting a government office.',
    intro:
      "If your vehicle is registered in Ogun State — whether you're based in Abeokuta, Sagamu, or Ijebu-Ode — vehicle license renewal follows the same core requirements as the rest of Nigeria, with processing handled through the state's licensing authority.",
    sections: [
      {
        title: 'What you need before renewing',
        body: 'Your existing vehicle license details and current plate number are the starting point. If your road worthiness certificate has also lapsed, it makes sense to renew both at once rather than making two separate trips or submissions.',
      },
      {
        title: 'Renewing without visiting Abeokuta',
        body: "The licensing office in Abeokuta serves the whole state, which means a long trip for vehicle owners in Sagamu, Ijebu-Ode, or anywhere else in Ogun. Motoka's licensed agent network processes Ogun State renewals online, regardless of which part of the state you're in.",
      },
      {
        title: 'What it costs',
        body: "The government fee for Ogun State follows the standard state licensing schedule, plus Motoka's service fee — you'll see the exact breakdown before paying anything.",
      },
    ],
    closing:
      'Whether your documents are current or already expired, the process is the same: submit your details, confirm the fee, and get a verified digital copy without a trip to a licensing office.',
    ctaText: 'Renew your Ogun State vehicle license',
    ctaTo: '/states/ogun',
  },
  {
    slug: 'vehicle-license-renewal-ibadan-oyo-state-guide',
    eyebrow: 'State Guides',
    title: 'Vehicle License Renewal in Oyo State (Ibadan): Complete Guide',
    seoTitle: 'Vehicle License Renewal in Oyo State (Ibadan): Complete Guide | Motoka',
    seoDescription:
      'A complete guide to renewing your vehicle license in Oyo State, including Ibadan — what you need, what it costs, and how to do it online through Motoka.',
    intro:
      'Oyo State — and Ibadan in particular, as its largest city — has one of the highest vehicle populations in southwest Nigeria, which usually means one of the longer queues at the licensing office for anyone renewing in person.',
    sections: [
      {
        title: 'Who this applies to',
        body: "Any vehicle registered in Oyo State, whether you're based in Ibadan, Ogbomosho, or Oyo town itself, follows the same renewal process through the state's licensing authority.",
      },
      {
        title: 'Renewing from anywhere in the state',
        body: "You don't need to be physically present at an Ibadan licensing office to renew. Motoka's agent network processes Oyo State renewals online — submit your plate number and details from wherever you actually are.",
      },
      {
        title: 'Road worthiness alongside your license',
        body: 'If your road worthiness certificate needs renewing too, Motoka handles both together, coordinating the required inspection booking so you\'re not managing two separate processes.',
      },
    ],
    closing:
      "The process takes the same shape regardless of which part of Oyo State you're registered in — enter your details online, confirm the fee, and skip the queue entirely.",
    ctaText: 'Renew your Oyo State vehicle license',
    ctaTo: '/states/oyo',
  },
  {
    slug: 'road-worthiness-certificate-explained',
    eyebrow: 'Driver Guides',
    title: 'Road Worthiness Certificate: What It Is and How to Renew It Online',
    seoTitle: 'Road Worthiness Certificate: What It Is and How to Renew It Online | Motoka',
    seoDescription:
      'What a road worthiness certificate actually certifies, why every vehicle needs one, and how to renew yours online without a trip to the VIO.',
    intro:
      "\"Road worthiness\" gets used loosely, but the certificate itself has a specific purpose: confirming your vehicle has passed a physical inspection and meets minimum safety standards for the road.",
    sections: [
      {
        title: 'What actually gets inspected',
        body: 'A road worthiness inspection, carried out through the Vehicle Inspection Office (VIO), typically checks core safety systems — brakes, lights, tyres, and overall structural condition — rather than cosmetic issues.',
      },
      {
        title: 'Why it lapses like any other document',
        body: "A road worthiness certificate is valid for a fixed period, not indefinitely, since a vehicle's condition can change. That means it needs renewing on its own schedule, separate from your vehicle license.",
      },
      {
        title: 'The inspection is still required, but the queue isn\'t',
        body: "Renewing online doesn't remove the physical inspection requirement — a vehicle still has to be checked. What it removes is the queue: Motoka books and coordinates the inspection slot on your behalf instead of you showing up and waiting.",
      },
    ],
    closing:
      'Once the inspection is complete, a verified digital copy of your certificate is stored in your Motoka wallet, so it\'s on hand at any checkpoint alongside your other documents.',
    ctaText: 'Renew your road worthiness certificate',
    ctaTo: '/renew/road-worthiness',
  },
  {
    slug: 'vehicle-license-renewal-cost-nigeria',
    eyebrow: 'Driver Guides',
    title: 'How Much Does Vehicle License Renewal Cost in Nigeria? (2026 Prices)',
    seoTitle: 'How Much Does Vehicle License Renewal Cost in Nigeria? (2026 Prices) | Motoka',
    seoDescription:
      'What actually determines the cost of vehicle license renewal in Nigeria — government fees, vehicle category, and state — plus how Motoka shows the full breakdown upfront.',
    intro:
      "\"How much does it cost?\" is usually the first question, and the honest answer is: it depends — on your state, your vehicle category, and whether your documents are current or already expired. Here's what actually goes into the number.",
    sections: [
      {
        title: 'The government fee is set by your state',
        body: "Vehicle license renewal fees are set by each state's licensing authority, not nationally, and vary by vehicle category (private car, commercial vehicle, motorcycle, and so on). That's why the same renewal can cost differently in Lagos versus Ogun versus Oyo.",
      },
      {
        title: 'Expired documents usually cost more',
        body: 'Most states charge a higher fee for renewing a lapsed document than a current one — one more reason renewing on time, or as soon as possible after it lapses, keeps the cost down.',
      },
      {
        title: 'What Motoka adds',
        body: "On top of the government fee, Motoka charges a service fee for handling the process end to end — coordinating with the licensing office, tracking your renewal, and storing the verified result in your digital wallet.",
      },
    ],
    closing:
      "Rather than publish a single number that would be wrong for most readers, Motoka shows the exact breakdown — government fee plus service fee — for your specific state and vehicle before you pay anything.",
    ctaText: 'See your exact renewal cost',
    ctaTo: '/renew/vehicle-license',
  },
  {
    slug: 'renew-vehicle-license-different-state',
    eyebrow: 'Driver Guides',
    title: 'Can You Renew a Vehicle License From a Different State?',
    seoTitle: 'Can You Renew a Vehicle License From a Different State? | Motoka',
    seoDescription:
      "If you're physically in a different state from where your vehicle is registered, here's how vehicle license renewal actually works — and how Motoka's multi-state network handles it.",
    intro:
      "A common situation: your vehicle is registered in one state, but you're currently living or working in another. Does that mean a trip back to the original state just to renew a license?",
    sections: [
      {
        title: 'Registration state vs. current location',
        body: "Your vehicle license renewal is tied to the state where the vehicle is registered, not to wherever you happen to be. In person, that historically meant traveling back to that state's licensing office.",
      },
      {
        title: 'How Motoka removes that requirement',
        body: "Motoka's agent network covers multiple states, so the renewal is processed through the vehicle's registered state regardless of where you physically submit your details from. You don't need to travel — the process happens online either way.",
      },
      {
        title: 'What to have ready',
        body: "The same details as any renewal: your plate number and current vehicle license information. Which state the vehicle is registered in determines the applicable fee and processing office — not your current location.",
      },
    ],
    closing:
      "If you've been putting off a renewal because the vehicle is registered somewhere you no longer live, that's no longer a real obstacle — the whole process happens from wherever you are.",
    ctaText: 'Renew from anywhere',
    ctaTo: '/renew/vehicle-license',
  },
  {
    slug: 'drivers-license-renewal-nigeria-frsc',
    eyebrow: 'Driver Guides',
    title: "Driver's License Renewal in Nigeria: FRSC Process Explained",
    seoTitle: "Driver's License Renewal in Nigeria: FRSC Process Explained | Motoka",
    seoDescription:
      "How driver's license renewal works in Nigeria through the FRSC, what's different from vehicle license renewal, and how Motoka simplifies the process.",
    intro:
      "Driver's license renewal is often confused with vehicle license renewal, but they're different documents issued by different bodies. The driver's license — your personal permission to drive — is issued and renewed through the Federal Road Safety Corps (FRSC).",
    sections: [
      {
        title: "Driver's license vs. vehicle license",
        body: "Your driver's license is tied to you personally and stays valid even if you change vehicles. Your vehicle license is tied to a specific car. Renewing one doesn't renew the other — they run on separate schedules.",
      },
      {
        title: 'Why it gets confusing',
        body: "Because both are commonly referred to as \"my papers,\" it's easy to renew a vehicle license and assume the driver's license is covered too. Checking both expiry dates separately avoids that gap.",
      },
      {
        title: 'How Motoka fits in',
        body: "Motoka tracks both your driver's license and vehicle license expiry dates in one wallet, with reminders ahead of each, and can process driver's license renewal through the same online flow — no need to track two separate systems.",
      },
    ],
    closing:
      "The two documents are related but independent — the safest approach is treating them as two separate reminders, not one combined renewal.",
    ctaText: "Renew your driver's license",
    ctaTo: '/renew/drivers-license',
  },
  {
    slug: 'motoka-save-ahead-wallet-explained',
    eyebrow: 'Product',
    title: "How Motoka's Save-Ahead Wallet Works (And Why It Beats Paying in One Lump Sum)",
    seoTitle: "How Motoka's Save-Ahead Wallet Works | Motoka",
    seoDescription:
      "Motoka's save-ahead wallet lets you set aside money toward your next vehicle document renewal gradually, instead of finding the full fee in one lump sum when it's due.",
    intro:
      "The most common reason a renewal gets delayed isn't forgetting the expiry date — it's not having the full fee ready when the date arrives. Motoka's save-ahead wallet is built specifically to fix that.",
    sections: [
      {
        title: 'The problem with lump-sum renewal costs',
        body: "Government and service fees for a renewal can be a meaningful amount to find all at once, especially when it lands the same month as other expenses. That's often what actually causes a document to lapse — not indifference, but timing.",
      },
      {
        title: 'How saving ahead works',
        body: "Instead of paying the full renewal fee in one go when it's due, you can set aside smaller amounts toward it over time, in the lead-up to your next expiry date — so the full amount is already there when you need it.",
      },
      {
        title: 'Why this matters more than a reminder alone',
        body: "A reminder tells you a deadline is coming; it doesn't help you afford it. Saving ahead solves the actual constraint that causes delays, not just the awareness of it.",
      },
    ],
    closing:
      "Combined with expiry reminders and encrypted document storage, the save-ahead wallet is designed to make sure a renewal is both remembered and affordable by the time it's due.",
    ctaText: 'See how the wallet works',
    ctaTo: '/wallet',
  },
  {
    slug: 'how-to-register-commercial-vehicle-lagos',
    eyebrow: 'Fleet Guides',
    title: 'How to Register a New Commercial Vehicle in Lagos: A Step-by-Step Guide for Fleet Owners',
    seoTitle: 'How to Register a Commercial Vehicle in Lagos (2026 Step-by-Step Guide) | Motoka',
    // Deliberately does not promise costs/timelines — the draft's original
    // meta description did, but the body carries neither, and a snippet that
    // over-promises just buys a bounce. Add figures to the body first, then
    // this can advertise them.
    seoDescription:
      'Buying vans, buses, or trucks for your Lagos business? A step-by-step guide to registering a new commercial vehicle in 2026 — FRSC plates, VIS roadworthiness, hackney permits, and LASDRI driver certification.',
    intro:
      "So you just added another bus, van, or truck to your fleet — congrats, that's growth. But before that vehicle can legally hit Lagos roads carrying goods or passengers, there's paperwork to sort out, and it's far less painful when you know exactly what's coming. Lagos treats commercial vehicles differently from private cars: there's an extra layer of registration, permits, and inspections, because you're moving people or cargo for money and the state wants to know the vehicle and its drivers can be trusted on the road.",
    sections: [
      {
        title: 'Step 1: Get your proof of ownership sorted first',
        body: 'Before anything else, make sure you have clean documentation for the vehicle itself:',
        bullets: [
          'Custom duty certificate (for imported/tokunbo vehicles) or purchase receipt/invoice (for brand-new vehicles bought from a dealership)',
          'Vehicle Identification Number (VIN) and engine number clearly visible and matching your paperwork',
          'A valid means of ID for the company or individual registering the vehicle — for businesses, this usually means your CAC certificate too',
        ],
        note: 'Skipping this step is one of the biggest reasons registrations get delayed, so double-check everything matches before you move forward.',
      },
      {
        title: 'Step 2: Register the plate number with FRSC',
        body:
          "You'll typically need proof of vehicle ownership, a valid means of identification, proof of address, an insurance certificate, and — because it's a commercial vehicle — a roadworthiness certificate and your Tax Identification Number (TIN). Head to your nearest FRSC office or state licensing office, fill out the vehicle registration form, and make sure every detail matches your supporting documents. Mismatched details are a classic cause of rejected applications, so triple-check spellings, chassis numbers, and dates. Once your plate is issued, verify it's genuine through the Nigeria Vehicle Verification Service (NVVS) portal — worth doing for your own records, and handy if a driver or buyer ever needs proof later.",
      },
      {
        title: 'Step 3: Get your Roadworthiness Certificate from VIS',
        body:
          'This is where commercial vehicles get extra scrutiny. The Lagos State Vehicle Inspection Service (VIS) — formerly the Vehicle Inspection Unit — issues the roadworthiness certificate, and LASTMA has the power to impound any vehicle caught without one. For a new commercial vehicle, book an inspection slot, take the vehicle in, and be ready for a queue: VIS centres get busy toward month-end when businesses are racing renewal deadlines.',
        note: "Pro tip: book your slot as soon as you take delivery of the vehicle, not the week you plan to put it on the road.",
      },
      {
        title: 'Step 4: Sort out your Hackney Permit',
        body:
          'If the vehicle will carry passengers commercially — staff buses, ride-hailing, shuttle services — you need a Hackney Permit on top of everything else. It\'s issued through the Lagos State Ministry of Transportation and is separate from your regular vehicle licence. It\'s effectively Lagos confirming that this specific vehicle is cleared to carry paying passengers.',
      },
      {
        title: 'Step 5: Make sure every driver has a LASDRI card',
        body:
          "Here's one people forget: it's not just the vehicle that needs registering — the driver does too. Commercial vehicle drivers, pick-up owners, and company vehicle drivers in Lagos must be certified by the Lagos State Drivers' Institute (LASDRI), separately from their regular driver's licence. This requirement applies in Lagos specifically, not nationwide. Put your drivers through LASDRI training and certification before they get behind the wheel of a fleet vehicle — it saves everyone unnecessary wahala with enforcement officers.",
      },
      {
        title: 'Step 6: Get third-party or comprehensive insurance',
        body:
          "This one's non-negotiable and applies across Nigeria, not just Lagos. Your commercial vehicle needs a valid insurance certificate before it can be registered — and for fleet vehicles carrying goods or people, comprehensive cover is usually worth the extra spend. One accident without it can wipe out months of profit.",
      },
      {
        title: 'Step 7: Keep all documents in the vehicle, always',
        body:
          'Once everything is issued, keep physical or digital copies inside the vehicle at all times. Enforcement checks are common on Lagos roads, and having everything on hand keeps things quick:',
        bullets: [
          'Vehicle licence',
          'Roadworthiness certificate',
          'Insurance certificate',
          'Hackney permit (if carrying passengers)',
          "Driver's LASDRI card and driver's licence",
        ],
      },
      {
        title: 'A quick recap for your checklist',
        steps: [
          'Confirm ownership documents and VIN/engine number match',
          'Register plate number with FRSC (bring ID, insurance, TIN, proof of address)',
          'Get Roadworthiness Certificate from VIS',
          'Apply for Hackney Permit (if carrying passengers)',
          'Ensure drivers have LASDRI certification',
          'Secure insurance cover',
          'Keep documents in-vehicle and copies on file',
        ],
      },
    ],
    closing:
      'Registering one vehicle is manageable on your own. But scaling a fleet — five, ten, fifty vehicles — multiplies this process across every vehicle and every renewal date until it becomes a job in itself. Motoka tracks each vehicle\'s expiry dates in one place and handles the renewals, so nothing slips through the cracks.',
    ctaText: 'Renew your fleet documents',
    ctaTo: '/renew/vehicle-license',
    related: [
      {
        label: 'Digital tools for tracking licence expiries — best apps for Lagos fleet operators',
        to: '/blog/digital-tools-tracking-licence-expiries-lagos',
      },
    ],
  },
  {
    slug: 'digital-tools-tracking-licence-expiries-lagos',
    eyebrow: 'Fleet Guides',
    title: 'Digital Tools for Tracking Licence Expiries and Compliance: Best Apps for Lagos Fleet Operators',
    seoTitle: 'Best Tools for Tracking Vehicle Licence Expiries — Lagos Fleet Guide | Motoka',
    seoDescription:
      "Tired of finding out a vehicle's papers expired the hard way — at a checkpoint? How Lagos fleet operators use digital tools to stay ahead of every renewal deadline.",
    intro:
      "Let's be honest: the moment your fleet grows past a handful of vehicles, keeping every roadworthiness certificate, insurance policy, hackney permit, and driver's licence straight in your head (or a notebook) stops working. Something always slips — and it's usually the one document you didn't think about that month. This is exactly the gap digital compliance tools are built to close.",
    sections: [
      {
        title: 'Why manual tracking breaks down so fast',
        body:
          'Most Nigerian fleet operators are still fixing vehicles when they break down rather than before, and the same reactive pattern shows up with paperwork — vehicle papers expire quietly and nobody notices until a driver gets stopped by FRSC or LASTMA. Multiply that risk across ten, twenty, or a hundred vehicles, each with three or four documents on different renewal cycles, and it stops being a "did we forget" problem and becomes a "we don\'t have a system" problem.',
      },
      {
        title: 'What a good compliance tracking system actually needs to do',
        body: "Before jumping into specific tools, it helps to know what you're actually looking for:",
        bullets: [
          "Automatic expiry tracking for every document type — vehicle licence, roadworthiness certificate, insurance, hackney permit, driver's LASDRI card and licence — with alerts sent before the deadline, not on the day.",
          'Per-vehicle and per-driver records, so you can see at a glance which specific vehicle or driver needs attention.',
          "Centralised access for your team, so whoever's handling renewals isn't the only person who knows what's due.",
          "Integration with GPS/telematics data, if you're already tracking vehicle location and usage — compliance and operations data are more useful together than apart.",
          'Simple reporting, so you can show at a moment\'s notice — to a client, an auditor, or your own management — that your fleet is fully compliant.',
        ],
      },
      {
        title: 'The types of tools worth looking at',
        body:
          'Dedicated fleet management platforms with built-in compliance tracking. A number of platforms serving the Nigerian market — some built specifically for local conditions — now bundle document expiry tracking alongside GPS location, fuel monitoring, and driver behaviour scoring. The advantage is having everything in one dashboard instead of juggling a tracking app, a separate spreadsheet, and WhatsApp reminders. Look for platforms that explicitly mention roadworthiness, insurance, and permit tracking as a feature, not just GPS — some GPS-only tools skip compliance entirely.',
        bullets: [
          'GPS and telematics providers with compliance add-ons — if you already use a GPS service for routing, driver monitoring, or fuel management, check whether it offers document expiry alerts as an add-on. Several providers active in Nigeria now build this in, because customers kept asking.',
          'General-purpose reminder and scheduling apps — if your fleet is still a handful of vehicles, a shared calendar with recurring reminders set well ahead of each expiry can genuinely cover you. The key is discipline: someone has to own it, and it needs checking weekly.',
          'Spreadsheet-based trackers — plenty of Lagos operators start with a shared sheet of vehicle, document type, issue date and expiry, colour-coded as deadlines approach. It works for a while, but it depends entirely on someone remembering to update it. Treat it as a stepping stone, not a permanent plan.',
        ],
      },
      {
        title: "What to prioritise if you're choosing your first tool",
        body: "If you're a small-to-mid-size fleet operator deciding where to start, prioritise in this order:",
        steps: [
          'Get expiry tracking working reliably first — even a well-maintained spreadsheet with real reminders beats an expensive platform nobody updates.',
          'Add GPS/telematics next, once compliance tracking is solid, since it adds operational value (fuel, routing, driver safety) on top of compliance.',
          "Centralise access so the information isn't trapped on one person's phone or laptop — anyone managing the fleet should be able to check status instantly.",
          'Review monthly, not just when an alert fires — a quick monthly sweep across the whole fleet catches what a single-document alert might miss.',
        ],
      },
      {
        title: 'The real payoff',
        body:
          "The businesses that get hit hardest by expired documents aren't the ones without money for renewals — they're the ones without a system to know renewals are coming. A solid digital tracking setup, even a modest one, pays for itself the first time it stops a vehicle sitting impounded for a week over a certificate that should have been renewed a fortnight earlier. In a city like Lagos, where enforcement has genuinely tightened, that visibility isn't a nice-to-have — it's basic fleet hygiene.",
      },
    ],
    closing:
      'Motoka keeps every vehicle\'s licence, roadworthiness certificate and insurance in one encrypted wallet, sends reminders well ahead of each expiry date, and handles the renewal itself — so tracking and fixing happen in the same place rather than two.',
    ctaText: 'Track your fleet documents',
    ctaTo: '/renew/vehicle-license',
    related: [
      {
        label: 'How to register a new commercial vehicle in Lagos: a step-by-step guide for fleet owners',
        to: '/blog/how-to-register-commercial-vehicle-lagos',
      },
    ],
  },
]

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
