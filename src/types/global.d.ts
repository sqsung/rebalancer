import type { CATEGORIES, PATHS } from "@/constants";

export {};

declare global {
  interface WrapperComponent {
    children: React.ReactNode;
  }

  type PortfolioCategory = keyof typeof CATEGORIES;

  type Path = (typeof PATHS)[keyof typeof PATHS];

  type PortfolioByGroup = Record<PortfolioCategory, Portfolio>;

  type PercentageType = "growth" | "stable";

  type PortfolioInputField = "price" | "quantity";

  type PortfolioInputObject = Record<PortfolioInputField, number>;

  interface Holding {
    name: string;
    description: string;
    category: PortfolioCategory;
    growth: number;
    stable: number;
    price: number;
    quantity: number;
  }

  type Portfolio = Holding[];
}
