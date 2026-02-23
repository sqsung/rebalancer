import { usePortfolioContext } from "@/context";
import { getTotalPercentages } from "@/utils";

const getPercentageColor = (percentage: number) => {
  if (percentage < 50) {
    return "text-red-500";
  } else if (percentage <= 60) {
    return "text-orange-500";
  } else if (percentage <= 99) {
    return "text-yellow-500";
  } else {
    return "text-green-500";
  }
};

export const TotalPercentagesRow = () => {
  const { portfolio } = usePortfolioContext();
  const { stable, growth } = getTotalPercentages(portfolio);

  return (
    <li className="flex flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-3">
      <div className="flex items-start justify-between">
        <span className="text-zinc-700">합계</span>
        <div className="flex gap-1 font-bold text-zinc-500">
          <div className="flex gap-1">
            <span>안정:</span>
            <span className={getPercentageColor(stable)}>{stable}%</span>
          </div>
          <span> / </span>
          <div className="flex gap-1">
            <span>성장:</span>
            <span className={getPercentageColor(growth)}>{growth}%</span>
          </div>
        </div>
      </div>
    </li>
  );
};
