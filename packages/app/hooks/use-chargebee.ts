import { Chargebee } from "@chargebee/chargebee-js-types";
import { useEffect, useMemo, useRef, useState } from "react";

export const useChargebee = () => {
  const [isChargebeeLoaded, setIsChargebeeLoaded] = useState(false);
  const chargebee = useMemo<typeof Chargebee>(() => {
    if (!isChargebeeLoaded) {
      return null;
    } else {
      return window.Chargebee;
    }
  }, [isChargebeeLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.Chargebee) {
        setIsChargebeeLoaded(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return chargebee;
};
