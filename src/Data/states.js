// Data-driven so /states/:slug is one route/component instead of six
// near-identical page files. Each entry maps directly to a StatePage render.
// Keep guidance factual and state-variable; fees change — show estimates and
// confirm at checkout rather than promising a fixed amount.
export const STATES = [
  {
    slug: 'lagos',
    name: 'Lagos',
    cities: 'Ikeja, Lekki, Surulere, Victoria Island, Yaba, or anywhere else in Lagos',
    intro:
      "Lagos has the highest vehicle volume of any state Motoka serves — which usually means the longest queues at the licensing office. Renew your vehicle licence, road worthiness certificate, insurance and other vehicle papers online, wherever in Lagos you're based.",
    authority:
      'Vehicle licensing in Lagos is administered through the Lagos State MVAA and the AutoReg platform. Renewals are tied to your vehicle record and may require identity details (such as a Payer ID/NIN) depending on current rules.',
    portal: 'Lagos AutoReg portal (portal.autoreg.ng) and the state revenue/licensing channels, where applicable.',
    note: 'Lagos renewals can have state-specific requirements (for example, identity/Payer-ID rules) and road worthiness is confirmed through inspection. Motoka tells you exactly what applies to your plate.',
  },
  {
    slug: 'ogun',
    name: 'Ogun State',
    cities: 'Abeokuta, Sagamu, Ijebu-Ode, Ota, and surrounding areas',
    intro:
      'If your vehicle is registered in Ogun State, you can renew your vehicle licence, road worthiness certificate and insurance without a long trip to the licensing office. Motoka handles the process online and keeps your documents in one place.',
    authority:
      'Vehicle papers in Ogun State are processed through the state’s motor vehicle administration/licensing authority and approved channels for your local area.',
    portal: 'Ogun State motor vehicle licensing/Board of Internal Revenue channels (the exact office depends on your registration area).',
    note: 'Requirements and fees can vary by vehicle category and registration area in Ogun State. Your exact, itemised total is confirmed at checkout.',
  },
  {
    slug: 'oyo',
    name: 'Oyo State',
    cities: 'Ibadan, Ogbomosho, Oyo town, and across the state',
    intro:
      'Vehicle owners registered in Oyo State — including Ibadan — can renew their vehicle licence, road worthiness certificate and insurance online. Motoka manages the renewal so you spend less time dealing with paperwork and queues.',
    authority:
      'Vehicle licensing and renewals in Oyo State run through the state’s motor vehicle administration and revenue/licensing authorities.',
    portal: 'Oyo State motor vehicle licensing/Board of Internal Revenue channels serving your registration area.',
    note: 'Road worthiness usually involves an inspection. Fees and steps vary by vehicle type — Motoka confirms what applies before you pay.',
  },
  {
    slug: 'osun',
    name: 'Osun State',
    cities: 'Osogbo, Ile-Ife, Ilesa, Ede, and other towns',
    intro:
      'Registered in Osun State? Renew your vehicle licence, road worthiness certificate and insurance online with Motoka — no need to take time out to visit a licensing office.',
    authority:
      'Vehicle papers in Osun State are handled through the state’s motor vehicle administration/licensing authority and its approved processing channels.',
    portal: 'Osun State motor vehicle licensing/Board of Internal Revenue channels for your registration area.',
    note: 'Costs and inspection requirements depend on your vehicle category and state process. You’ll see a clear total at checkout before paying.',
  },
  {
    slug: 'edo',
    name: 'Edo State',
    cities: 'Benin City and across Edo State',
    intro:
      'Vehicle owners in Edo State can renew their vehicle licence, road worthiness certificate and insurance online. Motoka covers Benin City and the rest of Edo State, handling the renewal through the proper channels.',
    authority:
      'Vehicle licensing and renewals in Edo State are administered through the state’s motor vehicle administration and revenue/licensing authorities.',
    portal: 'Edo State motor vehicle licensing/Board of Internal Revenue channels serving your registration area.',
    note: 'Renewal steps (including road worthiness inspection) and fees vary by vehicle and location. Motoka confirms the exact cost at checkout.',
  },
  {
    slug: 'rivers',
    name: 'Rivers State',
    cities: 'Port Harcourt and across Rivers State',
    intro:
      'If your vehicle is registered in Rivers State, renew your vehicle licence, road worthiness certificate and insurance online with Motoka — whether you’re in Port Harcourt or elsewhere in the state.',
    authority:
      'Vehicle papers in Rivers State are processed through the state’s motor vehicle administration/licensing authority and approved channels.',
    portal: 'Rivers State motor vehicle licensing/Board of Internal Revenue channels for your registration area.',
    note: 'Fees and inspection requirements depend on your vehicle category and the state’s current process. Your itemised total is shown before you pay.',
  },
]

export function getStateBySlug(slug) {
  return STATES.find((s) => s.slug === slug)
}
