import { createContext, useContext, useEffect, useState } from "react";
import { Chargebee } from "@chargebee/chargebee-js-types";

const ChargebeeContext = createContext<{
  isChargebeeInited: boolean;
}>({
  isChargebeeInited: false,
});

export const ChargebeeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isChargebeeInited, setIsChargebeeInited] = useState(false);

  useEffect(() => {
    if (isChargebeeInited) return;
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
  }, [isChargebeeInited]);

  return (
    <ChargebeeContext.Provider value={{ isChargebeeInited }}>
      {children}
    </ChargebeeContext.Provider>
  );
};

export const useChargebeeContext = () => {
  return useContext(ChargebeeContext);
};
