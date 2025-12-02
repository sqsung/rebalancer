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
