import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import { Icon } from "@iconify/react";
import { getWallet } from "../../../services/apiWallet";

import { authStorage } from "../../../utils/authStorage";
import useCartStore, { selectItemCount } from "../../../store/cartStore";

function formatNaira(kobo) {
  return `₦${(Number(kobo || 0) / 100).toLocaleString("en-NG", { maximumFractionDigits: 2 })}`;
}

function WalletDemoChip() {
  const [showBalance, setShowBalance] = useState(true);
  const isAuth = authStorage.isAuthenticated();
  const { data: wallet, isLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
    enabled: isAuth,
  });

  if (!isAuth) return null;

  const amount = isLoading
    ? "₦—"
    : showBalance
      ? formatNaira(wallet?.balance_kobo)
      : "₦••••";

  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#EAF1FF] px-3 py-1.5 sm:px-5 sm:py-2">
      <button
        type="button"
        onClick={() => setShowBalance((v) => !v)}
        className="flex items-center justify-center text-[#697C8C] transition-opacity hover:opacity-70"
        aria-label={showBalance ? "Hide wallet balance" : "Show wallet balance"}
        title={showBalance ? "Hide balance" : "Show balance"}
      >
        <Icon
          icon={showBalance ? "solar:eye-bold" : "solar:eye-closed-bold"}
          width="15"
        />
      </button>
      <Link
        to="/wallet"
        className="text-sm sm:text-lg font-semibold text-[#2389E3] transition-opacity hover:opacity-90"
        title="Open wallet"
      >
        {amount}
      </Link>
    </div>
  );
}

/**
 * Ladipo section layout — same idea as LicenseLayout: pass `title`, optional `subTitle`, `backPath`.
 * Title stays beside the back button (left), not centered.
 */
export default function LadipoLayout({
  children,
  title = "Ladipo",
  subTitle,
  backPath,
  /** Custom node on the right of the header (overrides showWalletDemo) */
  headerEnd,
  /** UI demo: wallet chip on the marketplace header */
  showWalletDemo = false,
}) {
  const navigate = useNavigate();
  const isAuth = authStorage.isAuthenticated();
  const cartItemCount = useCartStore(selectItemCount);
  const goBack = () => {
    if (backPath) return navigate(backPath);
    if (window.history.length > 1) return navigate(-1);
    navigate("/");
  };

  const rightSlot =
    headerEnd ??
    (isAuth ? (
      showWalletDemo ? (
        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-3">
          <Link
            to="/settings"
            state={{ settingsPage: "ladipo-orders" }}
            className="whitespace-nowrap text-[11px] sm:text-[13px] font-semibold text-[#2389E3] underline-offset-2 hover:underline"
          >
            My Orders
          </Link>
          <WalletDemoChip />
        </div>
      ) : null
    ) : (
      <div className="flex flex-shrink-0 items-center gap-2">
        <Link
          to="/ladipo/cart-page"
          className="relative flex items-center gap-1.5 rounded-full bg-[#EAF1FF] px-3.5 py-1.5 text-xs font-semibold text-[#2389E3] hover:bg-[#d8e6ff] transition-colors"
          title="Shopping Cart"
        >
          <Icon icon="solar:cart-large-minimalistic-bold" width="16" />
          <span>Cart</span>
          {cartItemCount > 0 && (
            <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#2389E3] px-1 text-[10px] font-bold text-white">
              {cartItemCount > 99 ? "99+" : cartItemCount}
            </span>
          )}
        </Link>
      </div>
    ));

  return (
    <div className="flex flex-col min-h-full pb-14 sm:pb-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-3 mb-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <button
                type="button"
                onClick={goBack}
                className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E1E6F4] text-[#697C8C] transition-colors hover:bg-[#2389E3]/10 cursor-pointer"
              >
                <IoIosArrowBack className="h-5 w-5" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-medium text-[#05243F] md:text-2xl line-clamp-2">
                  {title}
                </h1>
                {subTitle ? (
                  <p className="hidden sm:block mt-1 text-sm font-normal text-[#05243F]/40 line-clamp-2">
                    {subTitle}
                  </p>
                ) : null}
              </div>
            </div>
            {rightSlot ? <div className="flex-shrink-0 pt-0.5">{rightSlot}</div> : null}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl md:max-w-5xl h-full px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
