import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CATEGORIES, DEFAULT_PORTFOLIO } from "@/constants";
import { toast } from "sonner";

interface PortfolioContext {
  portfolio: Holding[];
  addHolding: (holding: Holding) => void;
  updateHolding: (name: string, holding: Holding) => void;
  deleteHolding: (name: string) => void;
  resetPortfolio: () => void;
  savePortfolio: (portfolio: Portfolio, isToastNeeded: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContext>({
  portfolio: DEFAULT_PORTFOLIO,
  addHolding: () => {},
  updateHolding: () => {},
  deleteHolding: () => {},
  savePortfolio: () => {},
  resetPortfolio: () => {},
});

export const PortfolioContextProvider = ({ children }: WrapperComponent) => {
  const [portfolio, setPortfolio] = useState<Portfolio>(() => {
    const saved = localStorage.getItem("portfolio");

    if (!saved) {
      localStorage.setItem("portfolio", JSON.stringify(DEFAULT_PORTFOLIO));
      return DEFAULT_PORTFOLIO;
    }

    return JSON.parse(saved);
  });

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const addHolding = useCallback((holding: Holding) => {
    setPortfolio((previous) => [...previous, holding]);

    const categoryInKorean = CATEGORIES[holding.category];

    const id = toast(`새로운 ${categoryInKorean} 자산군 추가`, {
      description: `${holding.name} 안정형 ${holding.stable}%, 성장형 ${holding.growth}%`,
      action: {
        label: "확인",
        onClick: () => toast.dismiss(id),
      },
    });
  }, []);

  const updateHolding = useCallback((name: string, holding: Holding) => {
    setPortfolio((previous) => {
      const updated = previous.map((looped) => {
        const isTarget = looped.name === name;
        return isTarget ? holding : looped;
      });

      return updated;
    });

    const id = toast(`자산군을 수정했습니다`, {
      description: `${holding.name} 안정형 ${holding.stable}%, 성장형 ${holding.growth}%`,
      action: {
        label: "확인",
        onClick: () => toast.dismiss(id),
      },
    });
  }, []);

  const deleteHolding = useCallback((name: string) => {
    setPortfolio((previous) =>
      previous.filter((looped) => looped.name !== name),
    );

    const id = toast("삭제했습니다", {
      action: {
        label: "확인",
        onClick: () => toast.dismiss(id),
      },
    });
  }, []);

  const resetPortfolio = useCallback(() => {
    setPortfolio(DEFAULT_PORTFOLIO);

    const id = toast("포트폴리오를 초기화 했습니다", {
      action: {
        label: "확인",
        onClick: () => toast.dismiss(id),
      },
    });
  }, []);

  const savePortfolio = useCallback(
    (portfolio: Portfolio, isToastNeeded: boolean) => {
      setPortfolio(portfolio);

      if (isToastNeeded) {
        const id = toast("현재 설정을 저장했습니다", {
          action: {
            label: "확인",
            onClick: () => toast.dismiss(id),
          },
        });
      }
    },
    [],
  );

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addHolding,
        updateHolding,
        deleteHolding,
        savePortfolio,
        resetPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  return context;
};
