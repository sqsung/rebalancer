export const CATEGORIES = {
  stocks: "주식",
  bonds: "국채",
  alternatives: "대체 투자",
  cash: "인출금",
} as const;

export const DEFAULT_PORTFOLIO: Portfolio = [
  {
    name: "미국 주식 (UH)",
    description: "(TIGER 미국배당다우존스)",
    category: "stocks",
    growth: 30,
    stable: 20,
    price: 0,
    quantity: 0,
  },
  {
    name: "한국 주식",
    description: "(KODEX 200)",
    category: "stocks",
    growth: 10,
    stable: 5,
    price: 0,
    quantity: 0,
  },
  {
    name: "금 (UH)",
    description: "(ACE KRX금현물)",
    category: "alternatives",
    growth: 10,
    stable: 5,
    price: 0,
    quantity: 0,
  },
  {
    name: "리츠",
    description: "(TIGER 리츠부동산인프라)",
    category: "alternatives",
    growth: 30,
    stable: 20,
    price: 0,
    quantity: 0,
  },
  {
    name: "미국채 10년 (UH)",
    description: "(KODEX 미국10년국채선물)",
    category: "bonds",
    growth: 20,
    stable: 15,
    price: 0,
    quantity: 0,
  },
  {
    name: "현금성자산",
    description: "(TIGER KOFR금리액티브(합성))",
    category: "cash",
    growth: 0,
    stable: 35,
    price: 0,
    quantity: 0,
  },
];

export const PATHS = {
  calculator: "/",
  settings: "/settings",
} as const;

export const CALCULATE_CUSTOM_EVENT = "rebalance:calculate";
