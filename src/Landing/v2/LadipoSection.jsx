import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { getLadipoSections } from '../../services/apiLadipo'
import useCartStore from '../../store/cartStore'

const POPULAR_VEHICLES = [
  { label: 'Toyota Camry', make: 'Toyota', model: 'Camry' },
  { label: 'Honda Accord', make: 'Honda', model: 'Accord' },
  { label: 'Lexus RX350', make: 'Lexus', model: 'RX350' },
  { label: 'Toyota Corolla', make: 'Toyota', model: 'Corolla' },
  { label: 'Mercedes C300', make: 'Mercedes', model: 'C300' },
]

const PART_CATEGORIES = [
  { label: 'All Categories', value: '' },
  { label: 'Brake Pads & Rotors', value: 'brake' },
  { label: 'Shock Absorbers & Suspension', value: 'shock' },
  { label: 'Engine Oils & Fluids', value: 'oil' },
  { label: 'Oil, Air & Fuel Filters', value: 'filter' },
  { label: 'Headlamps & Mirrors', value: 'headlamp' },
  { label: 'Batteries & Electrical', value: 'battery' },
]

const MARKET_PILLARS = [
  {
    number: '01',
    title: 'Guaranteed Fitment',
    tagline: '100% Fitment Match',
    body: 'Filter by your exact car make, model, and year before spending a kobo.',
    detail: 'No more guessing or finding out at your mechanic’s workshop that the part is wrong. If it doesn’t fit, return it within 48 hours for a full refund.',
    bg: '#ebf5ff',
    badgeBg: '#dbeafe',
    badgeColor: '#1d4ed8',
    icon: 'solar:tuning-square-2-bold-duotone',
  },
  {
    number: '02',
    title: 'Vetted Ladipo Stalls',
    tagline: 'Inspected Physical Stores',
    body: 'Zero counterfeit parts. Every merchant is physically audited inside Ladipo.',
    detail: 'We inspect vendor stalls and inventory before listing. Any merchant caught stocking counterfeit or sub-standard spares is permanently removed from the network.',
    bg: '#f0fffa',
    badgeBg: '#dcfce7',
    badgeColor: '#15803d',
    icon: 'solar:shield-check-bold-duotone',
  },
  {
    number: '03',
    title: 'Escrow & Doorstep Dispatch',
    tagline: 'Payment Protection',
    body: 'Funds stay locked until the part arrives and is verified by you or your mechanic.',
    detail: 'Delivered directly to your home or mechanic workshop across all 36 states with end-to-end tracking. Skip the expressway traffic and tout hassles entirely.',
    bg: '#fef0ff',
    badgeBg: '#fae8ff',
    badgeColor: '#86198f',
    icon: 'solar:box-minimalistic-bold-duotone',
  },
]

const CURATED_VERIFIED_PARTS = [
  {
    id: 'honda-synth-oil',
    slug: 'honda-synthetic-blend-5w-20-motor-oil',
    name: 'Honda Synthetic Blend 5W-20 Motor Oil (1L)',
    brand: 'Honda OEM',
    condition: 'new',
    price_kobo: 1650000,
    primary_image_url:
      'https://res.cloudinary.com/dtcfzcauc/image/upload/v1788876116/ladipo-products/84ab4856-4abe-4f15-8f82-320ed88eed39-jpg.jpg',
    fitment: 'Civic, Accord, CR-V (All Years)',
    merchant: 'Alaba Autoparts • Ladipo Zone 2',
  },
  {
    id: 'mannol-legend-oil',
    slug: 'mannol-legend-ultra-0w-20-fully-synthetic-engine-oil',
    name: 'Mannol Legend Ultra 0W-20 Synthetic Oil (5L)',
    brand: 'Mannol Germany',
    condition: 'new',
    price_kobo: 1600000,
    primary_image_url:
      'https://res.cloudinary.com/dtcfzcauc/image/upload/v1788876112/ladipo-products/294bf914-eb3e-46c1-b3de-75df8830f7ba-png.png',
    fitment: 'Universal Japanese & European',
    merchant: 'Lube Direct • Ladipo Gate 4',
  },
  {
    id: 'valvoline-maxlife-oil',
    slug: 'valvoline-maxlife-full-synthetic-5w-30-high-mileage-motor-oil',
    name: 'Valvoline MaxLife 5W-30 High Mileage (4L)',
    brand: 'Valvoline USA',
    condition: 'new',
    price_kobo: 7800000,
    primary_image_url:
      'https://res.cloudinary.com/dtcfzcauc/image/upload/v1788876107/ladipo-products/bf9075cb-18c1-4a1a-bb97-a7b140f90560-jpg.jpg',
    fitment: 'Over 100k km Daily Drivers',
    merchant: 'Precision Auto Fluids',
  },
  {
    id: 'steering-shaft-lexus',
    slug: 'steering-intermediate-shaft-assembly',
    name: 'Intermediate Steering Shaft Assembly',
    brand: 'Toyota / Lexus',
    condition: 'tokunbo',
    price_kobo: 8400000,
    primary_image_url:
      'https://res.cloudinary.com/dtcfzcauc/image/upload/v1789292583/ladipo-products/e3ca6a30-4918-4d29-bacb-01372a53f5e7-jpg.jpg',
    fitment: 'Toyota Camry & Lexus ES350',
    merchant: 'Heritage Spares • Ladipo Main',
  },
]

function formatNaira(kobo) {
  return `₦${(Number(kobo || 0) / 100).toLocaleString('en-NG', {
    maximumFractionDigits: 0,
  })}`
}

function PartImage({ src, alt }) {
  const [error, setError] = useState(false)
  if (!src || error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-[#94a3b8] gap-1.5">
        <Icon icon="solar:box-minimalistic-bold-duotone" width="36" className="text-[#2389e3]/40" />
        <span className="text-[11px] font-medium text-[#94a3b8]">Verified Spare Part</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
    />
  )
}

export default function LadipoSection() {
  const navigate = useNavigate()
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [keyword, setKeyword] = useState('')
  const addItem = useCartStore((s) => s.addItem)

  // Query live backend sections for freshest items
  const { data: sectionsData } = useQuery({
    queryKey: ['landing-ladipo-sections'],
    queryFn: getLadipoSections,
    staleTime: 5 * 60 * 1000,
  })

  // Use curated verified parts by default to guarantee high-res photography and zero broken images,
  // merging with live prices where matching.
  const displayParts = CURATED_VERIFIED_PARTS.map((curated) => {
    const live = sectionsData?.essentials?.find((p) => p.slug === curated.slug || p.name?.includes(curated.brand))
    if (live) {
      return {
        ...curated,
        price_kobo: live.price_kobo || curated.price_kobo,
        inventory_id: live.inventory_id || curated.id,
      }
    }
    return curated
  })

  function handleSearch(e) {
    e?.preventDefault()
    const queryParts = []
    if (selectedVehicle) queryParts.push(selectedVehicle)
    if (selectedCategory) queryParts.push(selectedCategory)
    if (keyword.trim()) queryParts.push(keyword.trim())

    const queryStr = queryParts.join(' ')
    if (queryStr) {
      navigate(`/ladipo?q=${encodeURIComponent(queryStr)}`)
    } else {
      navigate('/ladipo')
    }
  }

  function handlePresetClick(vehicle) {
    setSelectedVehicle(vehicle.label)
    navigate(`/ladipo?q=${encodeURIComponent(vehicle.label)}`)
  }

  function handleQuickAddToCart(part, e) {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      inventoryId: part.inventory_id || part.id || part.slug,
      partId: part.id || part.slug,
      slug: part.slug,
      name: part.name,
      imageUrl: part.primary_image_url,
      priceKobo: part.price_kobo,
      quantity: 1,
    })
    toast.success(`${part.name} added to cart`, {
      icon: '🛒',
      style: {
        borderRadius: '12px',
        background: '#05243f',
        color: '#fff',
      },
    })
  }

  return (
    <section
      id="ladipo"
      className="relative bg-white overflow-hidden"
      style={{
        paddingTop: 100,
        paddingBottom: 110,
        paddingLeft: 'clamp(24px, 7.9vw, 114px)',
        paddingRight: 'clamp(24px, 7.9vw, 114px)',
      }}
    >
      {/* Asymmetric Section Header — matches Motoka v2 Services & WhyUs */}
      <Reveal>
        <p
          style={{
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.1em',
            color: '#64748b',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Ladipo Auto Marketplace
        </p>

        <div className="flex flex-col min-[1298px]:flex-row items-start justify-between w-full gap-[24px] min-[1298px]:gap-[60px] mb-12 sm:mb-16">
          <h2
            className="text-[35.6px] lg:text-[50.9px]"
            style={{ fontWeight: 500, color: '#2389e3', lineHeight: 1.15 }}
          >
            Genuine spare parts,{' '}
            <span style={{ color: '#05243f', display: 'block' }}>matched to your exact car</span>
          </h2>

          <p
            style={{
              fontWeight: 300,
              fontSize: 18,
              lineHeight: '37px',
              color: '#697c8c',
              maxWidth: 580,
            }}
          >
            Skip counterfeit parts, aggressive street touts, and market gridlock. Tell Motoka your vehicle’s make and model — we surface verified OEM and Tokunbo parts from physically inspected Ladipo stalls, protected by escrow until delivered.
          </p>
        </div>
      </Reveal>

      {/* Interactive Vehicle-First Finder Card */}
      <Reveal delay={100} className="mb-14 sm:mb-20">
        <div
          className="bg-[#f8fafc] border border-[rgba(5,36,63,0.08)] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-10"
          style={{ boxShadow: '0 2px 8px -2px rgba(5,36,63,0.04)' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-[rgba(5,36,63,0.06)]">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#f0fffa] text-[#15803d] flex items-center justify-center font-bold text-sm">
                <Icon icon="solar:shield-check-bold" width="18" />
              </span>
              <div>
                <span className="font-semibold text-sm text-[#05243f]">
                  Vehicle Fitment Guarantee
                </span>
                <span className="text-xs text-[#697c8c] hidden sm:inline ml-2">
                  • 100% money-back if a matched part does not fit your model
                </span>
              </div>
            </div>

            <Link
              to="/ladipo"
              className="text-xs sm:text-sm font-semibold text-[#2389e3] hover:underline flex items-center gap-1.5 transition-colors"
            >
              <span>Explore all 10,000+ parts</span>
              <Icon icon="solar:arrow-right-linear" width="16" />
            </Link>
          </div>

          {/* Search Inputs Row */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Vehicle Select */}
            <div className="md:col-span-4 relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-1.5 pl-1">
                Your Vehicle
              </label>
              <div className="relative">
                <Icon
                  icon="solar:wheel-bold-duotone"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2389e3]"
                  width="18"
                />
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full bg-white rounded-2xl pl-10 pr-8 py-3.5 text-sm font-medium text-[#05243f] border border-[rgba(5,36,63,0.12)] focus:border-[#2389e3] focus:ring-2 focus:ring-[#2389e3]/10 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Any Vehicle (Browse All)</option>
                  {POPULAR_VEHICLES.map((v) => (
                    <option key={v.label} value={v.label}>
                      {v.label}
                    </option>
                  ))}
                </select>
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none"
                  width="16"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="md:col-span-4 relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-1.5 pl-1">
                Category
              </label>
              <div className="relative">
                <Icon
                  icon="solar:wrench-bold-duotone"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2389e3]"
                  width="18"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white rounded-2xl pl-10 pr-8 py-3.5 text-sm font-medium text-[#05243f] border border-[rgba(5,36,63,0.12)] focus:border-[#2389e3] focus:ring-2 focus:ring-[#2389e3]/10 outline-none transition-all appearance-none cursor-pointer"
                >
                  {PART_CATEGORIES.map((c) => (
                    <option key={c.label} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none"
                  width="16"
                />
              </div>
            </div>

            {/* Keyword / Submit */}
            <div className="md:col-span-4 flex flex-col justify-end">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-1.5 pl-1">
                Keywords (Optional)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. Brake pad, Tokunbo shock..."
                    className="w-full bg-white rounded-2xl px-4 py-3.5 text-sm font-medium text-[#05243f] placeholder:text-[#94a3b8] border border-[rgba(5,36,63,0.12)] focus:border-[#2389e3] focus:ring-2 focus:ring-[#2389e3]/10 outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#2389e3] hover:bg-[#1a74c3] active:scale-[0.97] text-white px-5 sm:px-6 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <span>Search</span>
                  <Icon icon="solar:arrow-right-linear" width="16" />
                </button>
              </div>
            </div>
          </form>

          {/* Quick preset chips */}
          <div className="flex items-center flex-wrap gap-2 mt-5 pt-4 border-t border-[rgba(5,36,63,0.05)] text-xs">
            <span className="text-[#64748b] font-medium mr-1">Popular fits:</span>
            {POPULAR_VEHICLES.map((v) => (
              <button
                key={v.label}
                type="button"
                onClick={() => handlePresetClick(v)}
                className="px-3 py-1.5 rounded-full bg-white border border-[rgba(5,36,63,0.1)] text-[#05243f] hover:border-[#2389e3] hover:text-[#2389e3] active:scale-[0.97] transition-all cursor-pointer font-medium"
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 3 Bespoke 3D TiltCards — Motoka's Ladipo Trust Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mb-16 sm:mb-24">
        {MARKET_PILLARS.map((pillar, i) => (
          <Reveal key={pillar.number} delay={i * 120} className="h-full">
            <TiltCard
              className="h-full flex flex-col justify-between"
              style={{
                padding: '32px',
                borderRadius: 32,
                background: pillar.bg,
                border: '1px solid rgba(5,36,63,0.1)',
                minHeight: 380,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      fontSize: 16,
                      color: 'rgba(5,36,63,0.4)',
                    }}
                  >
                    {pillar.number}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                    style={{ background: pillar.badgeBg, color: pillar.badgeColor }}
                  >
                    {pillar.tagline}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center mb-5 text-[#2389e3]">
                  <Icon icon={pillar.icon} width="28" />
                </div>

                <h3 className="text-2xl font-bold text-[#05243f] mb-3 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-base text-[#05243f]/80 leading-relaxed font-medium mb-3">
                  {pillar.body}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(5,36,63,0.08)]">
                <p className="text-[13px] text-[#697c8c] leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Verified Live Spares Showcase */}
      <Reveal delay={200} className="mb-16 sm:mb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748b] mb-1.5">
              Verified Marketplace Feed
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#05243f]">
              Featured Spares & Maintenance Essentials
            </h3>
            <p className="text-sm text-[#697c8c] mt-1">
              Physically verified parts from registered stalls, ready for immediate dispatch.
            </p>
          </div>

          <Link
            to="/ladipo"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2389e3] hover:underline self-start sm:self-auto shrink-0"
          >
            <span>Browse Complete Inventory</span>
            <Icon icon="solar:arrow-right-linear" width="16" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayParts.map((part) => {
            const isOem = part.condition === 'new'
            return (
              <div
                key={part.id || part.slug}
                className="group bg-white rounded-3xl border border-[rgba(5,36,63,0.1)] p-5 flex flex-col justify-between hover:border-[#2389e3] hover:shadow-xl hover:shadow-[#2389e3]/10 transition-all duration-300"
              >
                <div>
                  {/* Part Image Card */}
                  <div className="relative w-full h-[180px] bg-[#f8fafc] rounded-2xl flex items-center justify-center p-4 mb-4 overflow-hidden border border-[rgba(5,36,63,0.04)]">
                    <PartImage src={part.primary_image_url} alt={part.name} />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-2xs ${
                        isOem
                          ? 'bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]'
                          : 'bg-[#dbeafe] text-[#1d4ed8] border-[#bfdbfe]'
                      }`}
                    >
                      {isOem ? 'New OEM' : 'Tokunbo Tested'}
                    </span>
                  </div>

                  {/* Brand & Fitment */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2389e3]">
                      {part.brand || 'Verified OEM'}
                    </span>
                    <span className="text-[11px] font-medium text-[#64748b] truncate max-w-[140px]">
                      {part.fitment || 'Multi-Vehicle Fit'}
                    </span>
                  </div>

                  {/* Part Title */}
                  <Link to={`/ladipo`}>
                    <h4
                      className="text-[14px] sm:text-[15px] font-bold text-[#05243f] leading-snug line-clamp-2 hover:text-[#2389e3] transition-colors mb-2"
                      title={part.name}
                    >
                      {part.name}
                    </h4>
                  </Link>

                  <p className="text-[12px] text-[#64748b] truncate mb-4">
                    {part.merchant || 'Vetted Ladipo Merchant'}
                  </p>
                </div>

                {/* Price & Action Row */}
                <div className="pt-3 border-t border-[rgba(5,36,63,0.06)] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#94a3b8] block -mb-0.5 font-medium">Price</span>
                    <span className="text-[17px] font-bold text-[#05243f]">
                      {formatNaira(part.price_kobo)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAddToCart(part, e)}
                    className="h-10 px-4 rounded-full bg-[#ebf5ff] hover:bg-[#2389e3] text-[#2389e3] hover:text-white active:scale-[0.97] transition-all flex items-center gap-1.5 font-semibold text-xs cursor-pointer"
                    title="Add to cart"
                    aria-label={`Add ${part.name} to cart`}
                  >
                    <Icon icon="solar:cart-plus-bold" width="16" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* Motoka Bespoke Marketplace Spotlight Banner */}
      <Reveal delay={250}>
        <div
          className="relative rounded-[32px] overflow-hidden text-white p-8 sm:p-12 lg:p-14"
          style={{
            background: 'linear-gradient(135deg, #05243f 0%, #0d3862 100%)',
            boxShadow: '0 20px 40px -15px rgba(5,36,63,0.3)',
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2389e3]/20 blur-3xl pointer-events-none"
            aria-hidden
          />
          <div
            className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#5DF8D0]/10 blur-3xl pointer-events-none"
            aria-hidden
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#5DF8D0] mb-4">
              <Icon icon="solar:stars-minimalistic-bold" width="15" />
              <span>Over 10,000+ Parts Listed Across Lagos & Abuja</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold leading-tight mb-4 tracking-tight">
              Looking for a specific or hard-to-find part?
            </h3>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 font-light">
              Don’t spend days driving through traffic. Tell us your chassis number (VIN) or part requirement — our verified merchant network and Mo AI assistant will track it down with escrow protection.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/ladipo"
                className="bg-[#2389e3] hover:bg-[#1a74c3] active:scale-[0.97] text-white font-semibold px-8 py-4 rounded-full text-center text-sm transition-all shadow-lg shadow-[#2389e3]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Browse Ladipo Marketplace</span>
                <Icon icon="solar:arrow-right-linear" width="18" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  const widget =
                    document.getElementById('chat-widget-toggle') ||
                    document.querySelector('button[aria-label="Open chat"]')
                  if (widget) widget.click()
                  else navigate('/mo')
                }}
                className="bg-white/10 hover:bg-white/15 active:scale-[0.97] text-white font-semibold px-7 py-4 rounded-full text-center text-sm transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Icon icon="solar:chat-round-dots-bold" width="18" className="text-[#5DF8D0]" />
                <span>Ask Mo to Find My Part</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
