import { useEffect } from "react";
import { trackPageView } from "../utils/matomo.ts";

export function useTrackPageView() {
  useEffect(() => {
    trackPageView();
  }, []);
}
