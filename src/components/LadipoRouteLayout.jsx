import AppLayout from "./AppLayout";
import MarketingLayout from "./MarketingLayout";
import { useIsAuthenticated } from "../utils/authStorage";

/**
 * Adaptive layout for the Ladipo auto parts marketplace:
 * - When signed in: renders AppLayout with full user navigation, avatar, and notifications.
 * - When a guest: renders MarketingLayout with Motoka header, navigation, and footer.
 */
export default function LadipoRouteLayout() {
  const isAuth = useIsAuthenticated();

  if (isAuth) {
    return <AppLayout />;
  }

  return <MarketingLayout />;
}
