import { CATEGORIES } from "@/constants";
import { usePortfolioContext } from "@/context";
import { HoldingItem } from "@/modules/settings";
import { EmptyFallback } from "@/modules/shared";
import {
  checkIsValidCategory,
  getGroupedPortfolio,
  getPercentagesByCategory,
} from "@/utils";

interface GroupedPortfolioRowProps {
  category: string;
}

export const GroupedPortfolioRow = ({ category }: GroupedPortfolioRowProps) => {
  const { portfolio } = usePortfolioContext();

  if (!checkIsValidCategory(category)) {
    return null;
  }

  const grouped = getGroupedPortfolio(portfolio);
  const holdings = grouped[category];
  const { growth, stable } = getPercentagesByCategory(portfolio, category);
  const labelInKorean = CATEGORIES[category];

  return (
    <li className="flex flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-3">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-1">
        <span className="text-zinc-700">{labelInKorean}</span>
        <span className="text-sm text-zinc-400">
          안정 {stable}% / 성장 {growth}%
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {!holdings.length ? (
          <EmptyFallback />
        ) : (
          holdings.map((holding, index) => (
            <HoldingItem
              key={holding.name}
              holding={holding}
              isLast={index + 1 === holdings.length}
            />
          ))
        )}
      </ul>
    </li>
  );
};
