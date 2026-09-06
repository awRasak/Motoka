export const DAILY_ROAD_TIPS = [
  {
    category: 'Road Signs',
    title: 'What does this sign mean?',
    content: 'The red circle with a number indicates a maximum speed limit in km/h. For example, 50 means you must not exceed 50 km/h in that zone.',
    icon: '🚏',
  },
  {
    category: 'Road Signs',
    title: 'Yield vs Stop',
    content: 'A downward-pointing triangle means "Yield" — slow down and give way. An octagon (8-sided red sign) means "Stop" — you must come to a complete halt.',
    icon: '🛑',
  },
  {
    category: 'Fines & Penalties',
    title: 'Expired license fine',
    content: 'Driving with an expired vehicle license in Nigeria can attract fines between ₦5,000 to ₦15,000 per offence. In 2025, FRSC impounded over 150,000 vehicles nationwide.',
    icon: '💸',
  },
  {
    category: 'Fines & Penalties',
    title: 'Missing insurance',
    content: 'Driving without valid third-party insurance is an offence. Penalties can include fines and vehicle impoundment. Always keep your insurance current.',
    icon: '⚠️',
  },
  {
    category: 'Car Checklist',
    title: 'What to always have in your car',
    content: 'Driver\'s license, vehicle license, road worthiness certificate, proof of ownership, third-party insurance, fire extinguisher (for commercial vehicles), and warning triangle.',
    icon: '📋',
  },
  {
    category: 'Car Checklist',
    title: 'Before you drive off',
    content: 'Check your tyres (pressure and tread), lights (headlights, brake lights, indicators), mirrors, seatbelts, and fuel level. A 2-minute check prevents breakdowns.',
    icon: '🔍',
  },
  {
    category: 'Road Etiquette',
    title: 'Using your horn',
    content: 'Use your horn to alert, not to express frustration. A short tap warns pedestrians or other drivers. Repeated honking in traffic is considered aggressive and unnecessary.',
    icon: '📯',
  },
  {
    category: 'Road Etiquette',
    title: 'Pedestrian right of way',
    content: 'At zebra crossings, pedestrians have the right of way. Always slow down and stop when someone is crossing — it\'s both the law and basic courtesy.',
    icon: '🚶',
  },
  {
    category: 'Road Signs',
    title: 'Lane markings',
    content: 'Solid white lines mean no lane changes. Broken white lines mean you can change lanes when safe. Double solid lines mean no crossing in either direction.',
    icon: '🛣️',
  },
  {
    category: 'Car Checklist',
    title: 'Emergency kit essentials',
    content: 'Keep a flashlight, jumper cables, basic toolkit, first aid kit, and a portable phone charger in your boot. You never know when you\'ll need them.',
    icon: '🧰',
  },
  {
    category: 'Fines & Penalties',
    title: 'Phone use while driving',
    content: 'Using a phone while driving without a hands-free device is an offence. FRSC officers actively enforce this — keep your phone in your pocket or mount.',
    icon: '📱',
  },
  {
    category: 'Road Etiquette',
    title: 'Merging onto highways',
    content: 'When merging, match the speed of traffic in the lane you\'re joining. Signal early, check your mirrors and blind spot, and merge smoothly — don\'t stop at the merge point.',
    icon: '🏎️',
  },
  {
    category: 'Road Signs',
    title: 'Warning signs are yellow',
    content: 'Yellow diamond-shaped signs warn of upcoming hazards — curves, intersections, pedestrian crossings, or construction ahead. Slow down when you see them.',
    icon: '⚠️',
  },
  {
    category: 'Car Checklist',
    title: 'Tyre tread depth',
    content: 'Your tyre tread should be at least 1.6mm deep. Insert a ₦1 coin into the tread — if you can see the outer ring, your tyres are too worn and need replacing.',
    icon: '🛞',
  },
  {
    category: 'Fines & Penalties',
    title: 'Seatbelt violation',
    content: 'Not wearing a seatbelt attracts a fine. All front-seat passengers must wear seatbelts. It\'s the single most effective safety measure in a crash.',
    icon: '🔒',
  },
  {
    category: 'Road Etiquette',
    title: 'Night driving',
    content: 'Use dipped headlights (not high beams) in traffic. High beams blind oncoming drivers. Switch to high beams only on empty, unlit roads — and switch back when you see lights ahead.',
    icon: '🌙',
  },
]

export function getDailyTip() {
  const today = new Date()
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  )
  return DAILY_ROAD_TIPS[dayOfYear % DAILY_ROAD_TIPS.length]
}
