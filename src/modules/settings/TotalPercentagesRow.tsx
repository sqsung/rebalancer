import { usePortfolio } from "@/context/PortfolioContext";
import { getTotalPercentages } from "@/utils";

export const TotalPercentagesRow = () => {
  const { portfolio } = usePortfolio();
  const { stable, growth } = getTotalPercentages(portfolio);

  return (
    <li className="flex flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-3">
      <div className="flex items-start justify-between">
        <span className="text-zinc-700">합계</span>
        <div className="flex gap-1 font-bold text-zinc-700">
          <span>안정: {stable}%</span>
          <span>/</span>
          <span>성장: {growth}%</span>
        </div>
      </div>
    </li>
  );
};
