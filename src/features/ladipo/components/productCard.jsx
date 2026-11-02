import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useCartStore from "../../../store/cartStore";

const CONDITION_LABELS = {
  new: { text: "New", color: "bg-emerald-500 text-white" },
  tokunbo: { text: "Tokunbo", color: "bg-[#2389E3] text-white" },
  nigerian_used: { text: "Used", color: "bg-[#EBB850] text-white" },
};

function ProductCard({ part }) {
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();
  const condition = CONDITION_LABELS[part.condition] || CONDITION_LABELS.new;

  function buildCartItem() {
    return {
      inventoryId: part.inventory_id,
      partId: part.id,
      slug: part.slug,
      name: part.name,
      imageUrl: part.primary_image_url,
      priceKobo: part.price_kobo,
      quantity: 1,
    };
  }

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!part.inventory_id) return toast.error("This part is currently unavailable");
    addItem(buildCartItem());
    toast.success(`${part.name} added to cart`);
  }

  function handleBuyNow(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!part.inventory_id) return toast.error("This part is currently unavailable");
    addItem(buildCartItem());
    navigate("/ladipo/cart-page");
  }

  function handleCardOpen() {
    if (!part?.slug) return;
    navigate(`/ladipo/${part.slug}`);
  }

  return (
    <div
      className="group relative flex flex-col h-full w-full cursor-pointer rounded-2xl border border-[#E1E6F4] bg-white p-3 sm:p-3.5 transition-all duration-300 hover:border-[#2389E3] hover:shadow-md"
      onClick={handleCardOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${part?.name || "product"} details`}
    >
      <button
        onClick={handleAddToCart}
        className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-white/95 text-[#697C8C] shadow-xs border border-[#E1E6F4] hover:bg-[#2389E3] hover:text-white hover:border-[#2389E3] transition-all cursor-pointer"
        title="Add to cart"
        aria-label="Add to cart"
      >
        <Icon icon="lucide:plus" width="14" strokeWidth="3" />
      </button>

      {part.condition && (
        <span className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 rounded-md px-2 py-0.5 text-[9px] font-bold shadow-xs ${condition.color}`}>
          {condition.text}
        </span>
      )}

      {/* Uniform Image Stage: all product images scale into identical square frame */}
      <div className="relative mb-3 aspect-square w-full rounded-xl bg-[#F8FAFC] flex items-center justify-center p-3 sm:p-4 overflow-hidden">
        {part.primary_image_url ? (
          <img
            src={part.primary_image_url}
            alt={part.name}
            className="h-full w-full max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Icon icon="solar:box-bold-duotone" width="36" className="text-[#D3D9DE] sm:w-10 sm:h-10" />
        )}
      </div>

      {/* Product Content: Title strictly 2 lines, brand 1 line, button pinned to bottom */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3
            className="text-[12px] sm:text-[13px] font-bold leading-[1.3] text-[#05243F] line-clamp-2 min-h-[2.6em] max-h-[2.6em] overflow-hidden mb-1 group-hover:text-[#2389E3] transition-colors"
            title={part.name}
          >
            {part.name}
          </h3>

          <p className="text-[11px] sm:text-[12px] font-medium text-[#8A9EB0] truncate min-h-[1.25rem] max-h-[1.25rem] mb-2">
            {part.brand || "\u00A0"}
          </p>
        </div>

        <div className="mt-auto pt-2 flex flex-col gap-2">
          <p className="text-[13px] sm:text-[15px] font-bold text-[#2389E3] leading-none truncate">
            {part.price_kobo != null
              ? `\u20A6${(Math.round(part.price_kobo) / 100).toLocaleString("en-NG", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`
              : "\u2014"}
          </p>

          <button
            type="button"
            onClick={handleBuyNow}
            className="flex w-full items-center justify-center rounded-full bg-[#DFE4E8] py-2 text-[12px] sm:text-[13px] font-bold text-white transition-colors duration-200 cursor-pointer group-hover:bg-[#2389E3] hover:!bg-[#1a76c7]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
