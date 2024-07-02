import { useEffect, useState } from "react";
import { Chargebee } from "@chargebee/chargebee-js-types";

export const useChargebee = () => {
  const [isChargebeeInited, setIsChargebeeInited] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const chargebee = window.Chargebee as typeof Chargebee | undefined;
      if (chargebee) {
        chargebee.init({
          site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE!,
          publishableKey: process.env.NEXT_PUBLIC_CHARGEBEE_PUBLISHABLE_KEY!,
        });
        setIsChargebeeInited(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return isChargebeeInited;
};
