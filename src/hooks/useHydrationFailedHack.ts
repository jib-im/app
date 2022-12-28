import { useEffect, useState } from "react";

export const useHydrationFailedHack = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return { mounted };
};
