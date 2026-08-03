import { useEffect, useState } from "react";

// Same 1440px reference width the whole site's Figma-derived layout is
// designed at — keeps the navbar's logo/text size in lockstep with the
// home page and produtos page, whatever the actual viewport width is.
const NAV_CANVAS_WIDTH = 1440;

export function useNavScale() {
  const [scale, setScale] = useState(() => window.innerWidth / NAV_CANVAS_WIDTH);

  useEffect(() => {
    const updateScale = () => setScale(window.innerWidth / NAV_CANVAS_WIDTH);
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
}
