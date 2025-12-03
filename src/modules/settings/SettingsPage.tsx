import clsx from "clsx";
import { CATEGORIES } from "@/constants";
import { usePortfolio } from "@/context/PortfolioContext";
import { OutletWrapper } from "@/modules/shared/OutletWrapper";
import { Button } from "@/modules/ui";
import { getGroupedPortfolio } from "@/utils";

export const SettingsPage = () => {
  const { portfolio } = usePortfolio();
  const grouped = getGroupedPortfolio(portfolio);

  return (
    <OutletWrapper>
      <div className="flex h-full gap-3">
        <ul className="flex flex-1 flex-col gap-3">
          {Object.keys(grouped).map((key) => {
            const category = key as PortfolioCategory;
            const holdings = grouped[category as PortfolioCategory];
            const labelInKorean = CATEGORIES[category];

            return (
              <li
                key={category}
                className="flex flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-3"
              >
                <span className="border-b border-zinc-300 pb-1 text-zinc-700">
                  {labelInKorean}
                </span>

                <ul className="flex flex-col gap-2">
                  {holdings.map((holding, index) => {
                    const isLast = index + 1 === holdings.length;

                    return (
                      <li
                        key={holding.name}
                        className={clsx(
                          "flex justify-between py-3",
                          !isLast && "border-b border-zinc-100",
                        )}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold">{holding.name}</span>
                          <span className="text-zinc-500">
                            {holding.description}
                          </span>
                          <div className="mt-3 flex gap-3">
                            <div className="flex gap-1 text-zinc-500">
                              <span>안전</span>
                              <span className="font-bold text-orange-500">
                                {holding.stable}%
                              </span>
                            </div>
                            <div className="flex gap-1 text-zinc-500">
                              <span>성장</span>
                              <span className="font-bold text-orange-500">
                                {holding.growth}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button className="ml-auto flex items-center gap-3">
                          삭제
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <div className="flex-1 rounded-xl border border-zinc-300 bg-white"></div>
      </div>
    </OutletWrapper>
  );
};
