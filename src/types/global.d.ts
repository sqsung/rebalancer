import type { CATEGORIES } from "@/constants";

export {};

declare global {
  interface WrapperComponent {
    children: React.ReactNode;
  }

  type PortfolioCategory = keyof typeof CATEGORIES;

  interface Holding {
    name: string;
    description: string;
    category: PortfolioCategory;
    growth: number;
    stable: number;
    price: number;
    holding: number;
  }

  type Portfolio = Holding[];
}
