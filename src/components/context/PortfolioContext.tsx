import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_PORTFOLIO } from "@/constants";

interface PortfolioContext {
  portfolio: Holding[];
  addHolding: (holding: Holding) => void;
  updateHolding: (name: string, holding: Holding) => void;
  deleteHolding: (name: string) => void;
  resetPortfolio: () => void;
}

const PortfolioContext = createContext<PortfolioContext>({
  portfolio: DEFAULT_PORTFOLIO,
  addHolding: () => {},
  updateHolding: () => {},
  deleteHolding: () => {},
  resetPortfolio: () => {},
});

export const PortfolioProvider = ({ children }: WrapperComponent) => {
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

  const addHolding = (holding: Holding) => {
    setPortfolio((previous) => [...previous, holding]);
  };

  const updateHolding = (name: string, holding: Holding) => {
    setPortfolio((previous) => {
      const updated = previous.map((looped) => {
        const isTarget = looped.name === name;
        return isTarget ? holding : looped;
      });

      return updated;
    });
  };

  const deleteHolding = (name: string) => {
    setPortfolio((previous) =>
      previous.filter((looped) => looped.name !== name),
    );
  };

  const resetPortfolio = () => {
    setPortfolio(DEFAULT_PORTFOLIO);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addHolding,
        updateHolding,
        deleteHolding,
        resetPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  return context;
};
