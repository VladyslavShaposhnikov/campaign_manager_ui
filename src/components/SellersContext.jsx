import { createContext, useState, useCallback } from 'react';

export const SellersContext = createContext();

export function SellersProvider({ children }) {
  const [reloadFlag, setReloadFlag] = useState(false);

  const reloadSellers = useCallback(() => {
    setReloadFlag(flag => !flag);
  }, []);

  return (
    <SellersContext.Provider value={{ reloadFlag, reloadSellers }}>
      {children}
    </SellersContext.Provider>
  );
}
