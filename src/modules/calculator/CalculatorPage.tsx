import { Fragment, useEffect, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Table, TableBody, TableFooter } from "@/ui";
import { OutletWrapper } from "@/modules/shared";
import {
  HoldingRow,
  Classifier,
  TableHeader,
  DepositRow,
} from "@/modules/calculator";
import { getGroupedPortfolio } from "@/utils";

export const CalculatorPage = () => {
  const { portfolio } = usePortfolio();
  const grouped = getGroupedPortfolio(portfolio);

  const [values, setValues] = useState(() => {
    return Object.fromEntries(
      portfolio.map((holding) => [
        holding.name,
        { price: holding.price, quantity: holding.quantity },
      ]),
    );
  });

  const [deposit, setDeposit] = useState(0);

  const onValueChange = (
    name: string,
    field: "price" | "quantity",
    value: number,
  ) => {
    setValues((previous) => {
      const target = previous[name];

      if (!target) {
        return previous;
      }

      return {
        ...previous,
        [name]: {
          ...target,
          [field]: value,
        },
      };
    });
  };

  const total =
    Object.values(values).reduce((sum, state) => {
      return sum + state.price * state.quantity;
    }, 0) + deposit || 0;

  const rebalance = () => {
    alert("리밸런싱 시작!!");
  };

  useEffect(() => {
    window.addEventListener("calculator:run", rebalance);

    return () => window.removeEventListener("calculator:run", rebalance);
  }, []);

  const PORTFOLIO_BY_CATEGORY = [
    {
      label: "주식",
      holdings: grouped.stocks,
      isEmpty: !grouped.stocks.length,
    },
    { label: "국채", holdings: grouped.bonds, isEmpty: !grouped.bonds.length },
    {
      label: "대체 투자",
      holdings: grouped.alternatives,
      isEmpty: !grouped.alternatives.length,
    },
    { label: "인출금", holdings: grouped.cash, isEmpty: !grouped.cash.length },
  ] as const;

  return (
    <OutletWrapper>
      <div className="flex h-full w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Table className="flex h-full w-full flex-col">
          <TableHeader />
          <TableBody className="flex h-full flex-col bg-white">
            {PORTFOLIO_BY_CATEGORY.map((group, index) => {
              const isLast = index + 1 === PORTFOLIO_BY_CATEGORY.length;
              const isCash = group.holdings[0].category === "cash";

              return (
                <div className="flex flex-1">
                  <Classifier
                    category={group.label}
                    isEmpty={group.isEmpty}
                    isLast={isLast}
                  />
                  <div className="flex flex-1 flex-col justify-center">
                    {group.holdings.map((holding) => (
                      <Fragment key={holding.name}>
                        <HoldingRow holding={holding} />
                        {isLast && isCash && (
                          <DepositRow
                            total={total}
                            deposit={deposit}
                            onDepositChange={setDeposit}
                          />
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
            <TableFooter className="h-[50px] border-0 bg-zinc-900"></TableFooter>
          </TableBody>
        </Table>
      </div>
    </OutletWrapper>
  );
};
