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
    growth: 35,
    stable: 35,
    price: 0,
    quantity: 0,
  },
  {
    name: "인도주식 / 원자재",
    description: "(TIGER 인도니프티 50 / WT 원유)",
    category: "stocks",
    growth: 10,
    stable: 10,
    price: 0,
    quantity: 0,
  },
  {
    name: "금 (UH)",
    description: "(ACE KRX금현물)",
    category: "alternatives",
    growth: 0,
    stable: 15,
    price: 0,
    quantity: 0,
  },
  {
    name: "리츠",
    description: "(TIGER 리츠부동산인프라)",
    category: "alternatives",
    growth: 15,
    stable: 15,
    price: 0,
    quantity: 0,
  },
  {
    name: "미국채 30년 (UH)",
    description: "(ACE 미국30년국채액티브)",
    category: "bonds",
    growth: 25,
    stable: 0,
    price: 0,
    quantity: 0,
  },
  {
    name: "현금성자산",
    description: "(ACE 미국달러SOFRA금리(합성))",
    category: "cash",
    growth: 15,
    stable: 25,
    price: 0,
    quantity: 0,
  },
];

export const PATHS = {
  calculator: "/",
  settings: "/settings",
} as const;

export const CALCULATE_CUSTOM_EVENT = "rebalance:calculate";
