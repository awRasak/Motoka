import { FluentEmoji } from '@lobehub/fluent-emoji'
import {
  CircleAlert,
  TriangleAlert,
  CircleX,
  CircleParking,
  CircleDot,
  School,
  Columns2,
  MoveHorizontal,
  TrafficCone,
  ArrowRight,
  Ban,
  TrainFront,
  Banknote,
  ShieldAlert,
  Smartphone,
  ShieldCheck,
  IdCard,
  Gauge,
  FileText,
  Search,
  Wrench,
  Circle,
  CircleGauge,
  Disc,
  Battery,
  LayoutDashboard,
  Megaphone,
  Footprints,
  Merge,
  Moon,
  Ambulance,
  Car,
  Zap,
  Shield,
  Fuel,
  Thermometer,
  AlertOctagon,
  Siren,
  CarFront,
  FileCheck,
  CloudRain,
  CloudFog,
  Sun,
  Waves,
  Flame,
  Cross,
  Phone,
  HandMetal,
  CircleSmall,
  CircleDotDashed,
  ShieldAlert as ShieldAlertIcon,
} from 'lucide-react'

// Fluent emoji icons for categories that have good emoji coverage
const FluentIcons = {
  // Road Signs - use Fluent emojis
  'speed-limit': <FluentEmoji emoji="🚏" size={40} />,
  'yield-sign': <FluentEmoji emoji="🛑" size={40} />,
  'no-entry': <FluentEmoji emoji="🚫" size={40} />,
  'no-parking': <FluentEmoji emoji="🅿️" size={40} />,
  'roundabout': <FluentEmoji emoji="🔵" size={40} />,
  'school-zone': <FluentEmoji emoji="🏫" size={40} />,
  'bump': <FluentEmoji emoji="⛰️" size={40} />,
  'traffic-light': <FluentEmoji emoji="🚦" size={40} />,
  'railway': <FluentEmoji emoji="🚂" size={40} />,

  // Fines & Penalties
  'fine': <FluentEmoji emoji="💸" size={40} />,
  'warning': <FluentEmoji emoji="⚠️" size={40} />,
  'phone-off': <FluentEmoji emoji="📵" size={40} />,
  'seatbelt': <FluentEmoji emoji="🔒" size={40} />,
  'license': <FluentEmoji emoji="🪪" size={40} />,
  'speeding': <FluentEmoji emoji="🏎️" size={40} />,

  // Car Checklist
  'checklist': <FluentEmoji emoji="📋" size={40} />,
  'inspection': <FluentEmoji emoji="🔍" size={40} />,
  'toolbox': <FluentEmoji emoji="🧰" size={40} />,
  'tyre': <FluentEmoji emoji="🛞" size={40} />,
  'mirror': <FluentEmoji emoji="🪞" size={40} />,
  'oil': <FluentEmoji emoji="🛢️" size={40} />,
  'coolant': <FluentEmoji emoji="🌡️" size={40} />,
  'brake-fluid': <FluentEmoji emoji="🔴" size={40} />,
  'wiper': <FluentEmoji emoji="🌧️" size={40} />,
  'battery': <FluentEmoji emoji="🔋" size={40} />,
  'dashboard': <FluentEmoji emoji="🚨" size={40} />,

  // Road Etiquette
  'horn': <FluentEmoji emoji="📯" size={40} />,
  'pedestrian': <FluentEmoji emoji="🚶" size={40} />,
  'night': <FluentEmoji emoji="🌙" size={40} />,
  'ambulance': <FluentEmoji emoji="🚑" size={40} />,
  'hazard-lights': <FluentEmoji emoji="🔴" size={40} />,
  'wave': <FluentEmoji emoji="👋" size={40} />,

  // Safety Tips
  'rain': <FluentEmoji emoji="🌧️" size={40} />,
  'flood': <FluentEmoji emoji="🌊" size={40} />,
  'child-safety': <FluentEmoji emoji="👶" size={40} />,
  'fatigue': <FluentEmoji emoji="😴" size={40} />,
  'harmattan': <FluentEmoji emoji="🌫️" size={40} />,
  'fire-extinguisher': <FluentEmoji emoji="🧯" size={40} />,
  'accident': <FluentEmoji emoji="🚨" size={40} />,

  // Fuel & Efficiency
  'fuel': <FluentEmoji emoji="⛽" size={40} />,

  // Weather Driving
  'heavy-rain': <FluentEmoji emoji="🌧️" size={40} />,
  'fog': <FluentEmoji emoji="🌫️" size={40} />,
  'sun-glare': <FluentEmoji emoji="☀️" size={40} />,
  'hydroplaning': <FluentEmoji emoji="🌊" size={40} />,

  // Emergency Response
  'emergency': <FluentEmoji emoji="🚨" size={40} />,
  'first-aid': <FluentEmoji emoji="🩹" size={40} />,
  'phone': <FluentEmoji emoji="📞" size={40} />,
}

// Lucide icons for categories without good emoji coverage
const LucideIcons = {
  // Road Signs - technical ones
  'lane-marking': <Columns2 size={32} color="#05243f" />,
  'warning-sign': <TriangleAlert size={32} color="#ebb850" />,
  'narrow-road': <Columns2 size={32} color="#ebb850" />,
  'one-way': <ArrowRight size={32} color="#2389e3" />,
  'no-overtaking': <Ban size={32} color="#ef4444" />,

  // Road Etiquette - technical
  'merge': <Merge size={32} color="#2389e3" />,
  'tailgating': <Car size={32} color="#ef4444" />,
  'zipper': <Zap size={32} color="#2389e3" />,
  'intersection-block': <CircleX size={32} color="#ef4444" />,
  'signal': <ArrowRight size={32} color="#ebb850" />,
  'lane-discipline': <Columns2 size={32} color="#2389e3" />,

  // Safety Tips - technical
  'defensive': <Shield size={32} color="#2389e3" />,
  'breakdown': <CarFront size={32} color="#ef4444" />,
  'black-spot': <CircleDotDashed size={32} color="#05243f" />,
  'speed-kills': <AlertOctagon size={32} color="#ef4444" />,
  'blind-spot': <CircleSmall size={32} color="#94a3b8" />,
  'night-driving': <Moon size={32} color="#05243f" />,
  'brake-failure': <CircleAlert size={32} color="#ef4444" />,
  'blowout': <TriangleAlert size={32} color="#ef4444" />,
  'carjack': <ShieldAlertIcon size={32} color="#05243f" />,

  // Fuel & Efficiency - technical
  'idling': <CircleDot size={32} color="#94a3b8" />,
  'weight': <Circle size={32} color="#05243f" />,

  // Documents & Legal
  'documents': <FileText size={32} color="#2389e3" />,
  'renewal': <FileCheck size={32} color="#22c55e" />,
  'insurance': <ShieldCheck size={32} color="#2389e3" />,
}

export function getTipIcon(iconKey, size = 40) {
  // Try Fluent emoji first
  if (FluentIcons[iconKey]) {
    return <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{FluentIcons[iconKey]}</div>
  }
  // Fallback to Lucide
  if (LucideIcons[iconKey]) {
    return <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{LucideIcons[iconKey]}</div>
  }
  // Default fallback
  return <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircleAlert size={size} color="#94a3b8" /></div>
}
