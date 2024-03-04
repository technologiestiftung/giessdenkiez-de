import { useEffect } from "react";
import { useUrlState } from "../store";

export function useLocationEventListener() {
  const setPathname = useUrlState((state) => state.setPathname);

  useEffect(() => {
    window.onpopstate = () => {
      setPathname(window.location.pathname);
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);
}
