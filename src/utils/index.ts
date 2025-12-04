import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getNumberWithCommas = (number: number) => {
  return number.toLocaleString("en-US");
};

export const getGroupedPortfolio = (portfolio: Portfolio) => {
  const grouped: PortfolioByGroup = {
    stocks: [],
    alternatives: [],
    bonds: [],
    cash: [],
  };

  for (const holding of portfolio) {
    grouped[holding.category].push(holding);
  }

  return grouped;
};

export const getTotalPercentage = (
  portfolio: Portfolio,
  type: PercentageType,
) => {
  return portfolio.reduce((total, holding) => {
    return total + type === "growth" ? holding.growth : holding.stable;
  }, 0);
};

export const getPercentagesByCategory = (
  portfolio: Portfolio,
  category: PortfolioCategory,
) => {
  const filtered = portfolio.filter((holding) => holding.category === category);
  let growth = 0;
  let stable = 0;

  for (const holding of filtered) {
    growth += holding.growth;
    stable += holding.stable;
  }

  return {
    growth,
    stable,
  };
};
