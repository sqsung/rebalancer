import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";

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

  const onTotalChange = useCallback((newTotal: number | null) => {
    setTotal(newTotal);

    if (newTotal !== null) {
      const id = toast("포트폴리오 리밸런싱 완료!", {
        action: {
          label: "확인",
          onClick: () => toast.dismiss(id),
        },
      });
    }
  }, []);

  return (
    <TotalContext.Provider value={{ total, onTotalChange }}>
      {children}
    </TotalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTotalContext = () => {
  const context = useContext(TotalContext);
  return context;
};
