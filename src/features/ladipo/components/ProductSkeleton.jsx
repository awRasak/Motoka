export default function ProductSkeleton() {
  return (
    <div className="flex flex-col h-full w-full rounded-2xl border border-[#E1E6F4] bg-white p-3 sm:p-3.5 animate-pulse">
      {/* Image placeholder */}
      <div className="relative mb-3 aspect-square w-full rounded-xl bg-slate-100" />

      {/* Content placeholder */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Title 2 lines */}
          <div className="space-y-1.5 mb-2">
            <div className="h-3.5 w-full bg-slate-100 rounded" />
            <div className="h-3.5 w-3/4 bg-slate-100 rounded" />
          </div>

          {/* Brand */}
          <div className="h-3 w-16 bg-slate-100 rounded mb-2" />
        </div>

        {/* Price & Button */}
        <div className="mt-auto pt-2 flex flex-col gap-2">
          <div className="h-4 w-20 bg-slate-100 rounded" />
          <div className="h-8 w-full bg-slate-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}
