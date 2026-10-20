import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { getLadipoParts } from '../../services/apiLadipo'
import useCartStore from '../../store/cartStore'

const POPULAR_PILLS = [
  { label: 'Brake Pads', query: 'brake' },
  { label: 'Shock Absorbers', query: 'shock' },
  { label: 'Headlamps', query: 'headlamp' },
  { label: 'Oil & Fuel Filters', query: 'filter' },
  { label: 'Side Mirrors', query: 'mirror' },
  { label: 'Alternators', query: 'alternator' },
]

const TRUST_PILLARS = [
  {
    icon: 'solar:shield-check-bold-duotone',
    title: 'Vetted Merchants',
    desc: 'Inspected physical stalls & merchants in Ladipo market.',
  },
  {
    icon: 'solar:delivery-bold-duotone',
    title: 'Nationwide Delivery',
    desc: 'Direct doorstep dispatch with end-to-end tracking.',
  },
  {
    icon: 'solar:tag-price-bold-duotone',
    title: 'Direct Market Rates',
    desc: 'Fair open-market pricing with no excessive middlemen markups.',
  },
  {
    icon: 'solar:card-recive-bold-duotone',
    title: 'Buyer Protection',
    desc: 'Payment escrow and a 48-hour return window for wrong parts.',
  },
]

function formatNaira(kobo) {
  return `₦${(Number(kobo || 0) / 100).toLocaleString('en-NG', {
    maximumFractionDigits: 0,
  })}`
}

const CONDITION_BADGES = {
  new: { label: 'New OEM', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  tokunbo: { label: 'Tokunbo', bg: 'bg-blue-50 text-[#2389e3] border-blue-200' },
  nigerian_used: { label: 'Used', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
}

export default function LadipoSection() {
  const navigate = useNavigate()
  const [searchVal, setSearchVal] = useState('')
  const addItem = useCartStore((s) => s.addItem)

  const { data: partsData, isLoading } = useQuery({
    queryKey: ['landing-ladipo-featured'],
    queryFn: () => getLadipoParts({ sort: 'newest', limit: 4, page: 1 }),
    staleTime: 5 * 60 * 1000,
  })

  const featuredParts = partsData?.parts ?? []

  function handleSearchSubmit(e) {
    e.preventDefault()
    const trimmed = searchVal.trim()
    if (trimmed) {
      navigate(`/ladipo?q=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/ladipo')
    }
  }

  function handleQuickAddToCart(part, e) {
    e.preventDefault()
    e.stopPropagation()
    if (!part.inventory_id) {
      return toast.error('This part is currently out of stock')
    }
    addItem({
      inventoryId: part.inventory_id,
      partId: part.id,
      slug: part.slug,
      name: part.name,
      imageUrl: part.primary_image_url,
      priceKobo: part.price_kobo,
      quantity: 1,
    })
    toast.success(`${part.name} added to cart`)
  }

  return (
    <section className="relative bg-[#FAFCFF] border-y border-[#E1E6F4] py-16 sm:py-24 overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#2389e3]/10 to-transparent blur-3xl pointer-events-none rounded-full"
        aria-hidden
      />

      <div
        className="max-w-[1360px] mx-auto relative z-10"
        style={{
          paddingLeft: 'clamp(20px, 6vw, 80px)',
          paddingRight: 'clamp(20px, 6vw, 80px)',
        }}
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1FF] border border-[#2389e3]/20 mb-4">
            <Icon icon="solar:shop-bold" className="text-[#2389e3]" width="16" />
            <span className="text-[12px] sm:text-[13px] font-semibold text-[#2389e3] tracking-wide uppercase">
              Ladipo Spare Parts Marketplace
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#05243f] tracking-tight leading-[1.15] mb-4">
            Genuine Car Parts at Ladipo Market Rates,{' '}
            <span className="text-[#2389e3]">Delivered to You</span>
          </h2>

          <p className="text-[#697c8c] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Skip the road traffic, touts, and retail markups. Browse thousands of verified OEM,
            Tokunbo, and tested replacement parts directly from Ladipo's top merchants.
          </p>
        </div>

        {/* Search Bar & Quick Category Filter Pills */}
        <div className="max-w-2xl mx-auto mb-14">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-full p-2 border-2 border-[#2389e3]/30 shadow-lg shadow-[#2389e3]/5 hover:border-[#2389e3] focus-within:border-[#2389e3] focus-within:ring-4 focus-within:ring-[#2389e3]/10 transition-all"
          >
            <div className="pl-3.5 pr-2 text-[#697c8c]">
              <Icon icon="solar:magnifer-bold" width="22" />
            </div>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search brake pads, filters, bumpers, shocks..."
              className="flex-1 bg-transparent py-2 px-2 text-[#05243f] placeholder:text-[#8B98A5] text-[14px] sm:text-[15px] outline-none"
            />
            <button
              type="submit"
              className="bg-[#2389e3] hover:bg-[#1a76c7] text-white px-5 sm:px-6 py-2.5 rounded-full font-semibold text-[14px] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Search</span>
              <Icon icon="solar:arrow-right-linear" width="16" />
            </button>
          </form>

          {/* Quick Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-4 text-[13px]">
            <span className="text-[#8B98A5] font-medium text-xs">Popular:</span>
            {POPULAR_PILLS.map((p) => (
              <button
                key={p.query}
                type="button"
                onClick={() => navigate(`/ladipo?q=${encodeURIComponent(p.query)}`)}
                className="px-3 py-1 rounded-full bg-white border border-[#E1E6F4] text-[#697c8c] hover:border-[#2389e3] hover:text-[#2389e3] transition-colors cursor-pointer text-xs"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Live Products Rails / Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#05243f]">
                Featured In the Market
              </h3>
              <p className="text-sm text-[#697c8c]">
                Freshly stocked and verified spare parts ready for immediate delivery.
              </p>
            </div>
            <Link
              to="/ladipo"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2389e3] hover:underline shrink-0"
            >
              <span>View All Parts</span>
              <Icon icon="solar:arrow-right-linear" width="16" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-[#E1E6F4] p-4 flex flex-col animate-pulse"
                  >
                    <div className="w-full aspect-square bg-slate-100 rounded-xl mb-4" />
                    <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-slate-100 rounded w-1/2 mb-4" />
                    <div className="mt-auto h-8 bg-slate-100 rounded-full" />
                  </div>
                ))
              : featuredParts.map((part) => {
                  const condition = CONDITION_BADGES[part.condition] || CONDITION_BADGES.new
                  return (
                    <Link
                      key={part.id || part.slug}
                      to={`/ladipo/${part.slug}`}
                      className="group bg-white rounded-2xl border border-[#E1E6F4] p-4 flex flex-col hover:border-[#2389e3]/50 hover:shadow-lg hover:shadow-[#2389e3]/10 transition-all duration-200"
                    >
                      {/* Product Image */}
                      <div className="relative w-full aspect-square max-h-[140px] sm:max-h-[160px] bg-[#F8FAFC] rounded-xl flex items-center justify-center p-3 sm:p-4 mb-3 overflow-hidden">
                        {part.primary_image_url ? (
                          <img
                            src={part.primary_image_url}
                            alt={part.name}
                            className="max-h-full max-w-full w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <Icon
                            icon="solar:box-bold-duotone"
                            className="text-[#D3D9DE] w-10 h-10"
                          />
                        )}
                        <span
                          className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${condition.bg}`}
                        >
                          {condition.label}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] text-[#8B98A5] font-medium uppercase tracking-wider truncate block min-h-[1.25rem] max-h-[1.25rem] mb-1">
                            {part.brand || 'Verified Part'}
                          </span>
                          <h4
                            className="text-[13px] sm:text-[14px] font-bold text-[#05243f] leading-[1.3] line-clamp-2 min-h-[2.6em] max-h-[2.6em] overflow-hidden mb-2 group-hover:text-[#2389e3] transition-colors"
                            title={part.name}
                          >
                            {part.name}
                          </h4>
                        </div>
                        <div className="mt-auto pt-2 flex items-center justify-between border-t border-[#F0F4F8]">
                          <span className="text-[15px] sm:text-[16px] font-bold text-[#05243f]">
                            {formatNaira(part.price_kobo)}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleQuickAddToCart(part, e)}
                            className="w-8 h-8 rounded-full bg-[#EAF1FF] text-[#2389e3] hover:bg-[#2389e3] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                            title="Add to cart"
                            aria-label={`Add ${part.name} to cart`}
                          >
                            <Icon icon="solar:cart-plus-bold" width="16" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  )
                })}
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-[#E1E6F4]">
          {TRUST_PILLARS.map((t) => (
            <div key={t.title} className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#EAF1FF] text-[#2389e3] flex items-center justify-center shrink-0">
                <Icon icon={t.icon} width="24" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#05243f] mb-0.5">{t.title}</h4>
                <p className="text-[13px] text-[#697c8c] leading-snug">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Large Marketplace Banner CTA */}
        <div className="mt-14 bg-gradient-to-br from-[#05243f] to-[#0A3D69] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#05243f]/10">
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="text-[#5DF8D0] font-semibold text-xs tracking-wider uppercase mb-2 inline-block">
              Open Marketplace • Over 10,000+ Parts Listed
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
              Looking for a specific part or car model?
            </h3>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Explore the complete catalog with filters by category, brand, condition, and price. No sign-up required to browse and compare.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/ladipo"
              className="w-full sm:w-auto bg-[#2389e3] hover:bg-[#1a76c7] text-white font-bold px-7 py-3.5 rounded-full text-center text-sm transition-colors shadow-lg shadow-[#2389e3]/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Marketplace</span>
              <Icon icon="solar:arrow-right-linear" width="18" />
            </Link>
          </div>

          {/* Decorative Background Elements */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none"
            aria-hidden
          />
        </div>
      </div>
    </section>
  )
}
