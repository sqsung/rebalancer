import { createContext, useContext, useState } from "react";

interface TotalContext {
  total: number | null;
  onTotalChange: (total: number | null) => void;
}

const TotalContext = createContext<TotalContext>({
  total: null,
  onTotalChange: () => {},
});

export const TotalContextProvider = ({ children }: WrapperComponent) => {
  const [total, setTotal] = useState<number | null>(null);

  return (
    <TotalContext.Provider value={{ total, onTotalChange: setTotal }}>
      {children}
    </TotalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTotalContext = () => {
  const context = useContext(TotalContext);
  return context;
};
