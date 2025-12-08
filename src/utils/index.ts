import { CATEGORIES } from "@/constants";
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

export const getTotalPercentages = (portfolio: Portfolio) => {
  let growth = 0;
  let stable = 0;

  for (const holding of portfolio) {
    growth += holding.growth;
    stable += holding.stable;
  }

  return {
    stable,
    growth,
  };
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

export const checkIsValidCategory = (
  subject: string,
): subject is PortfolioCategory => {
  return Object.keys(CATEGORIES).includes(subject);
};

export const getCurrentRatio = (value: number, total: number) => {
  return ((value / total) * 100 || 0).toFixed(2);
};

export const getTargetAmount = (total: number, targetPercentage: number) => {
  return total * (targetPercentage * 0.01);
};
