import { CATEGORIES } from "@/constants";
import { usePortfolio } from "@/context/PortfolioContext";
import { HoldingItem } from "@/modules/settings";
import { EmptyFallback } from "@/modules/shared";
import { getGroupedPortfolio } from "@/utils";

const checkIsValidCategory = (
  subject: string,
): subject is PortfolioCategory => {
  return Object.keys(CATEGORIES).includes(subject);
};

interface GroupedPortfolioSectionProps {
  category: string;
}

export const GroupedPortfolioSection = ({
  category,
}: GroupedPortfolioSectionProps) => {
  const { portfolio } = usePortfolio();

  if (!checkIsValidCategory(category)) {
    return null;
  }

  const grouped = getGroupedPortfolio(portfolio);
  const holdings = grouped[category];
  const labelInKorean = CATEGORIES[category];

  return (
    <li className="flex flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-3">
      <span className="border-b border-zinc-300 pb-1 text-zinc-700">
        {labelInKorean}
      </span>
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
