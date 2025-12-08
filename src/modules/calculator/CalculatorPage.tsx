import { Fragment, useEffect, useRef, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Table, TableBody, TableFooter } from "@/ui";
import { OutletWrapper } from "@/modules/shared";
import {
  HoldingRow,
  Classifier,
  TableHeader,
  DepositRow,
} from "@/modules/calculator";
import { getGroupedPortfolio, getNumberWithCommas } from "@/utils";
import { SAVE_CUSTOM_EVENT } from "@/constants";

export const CalculatorPage = () => {
  const { portfolio, savePortfolio } = usePortfolio();
  const grouped = getGroupedPortfolio(portfolio);

  const [deposit, setDeposit] = useState(0);
  const [values, setValues] = useState(() => {
    return Object.fromEntries(
      portfolio.map((holding) => [
        holding.name,
        { price: holding.price, quantity: holding.quantity },
      ]),
    );
  });

  const valuesRef = useRef(values);

  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  const onValueChange = (key: string, value: PortfolioInputObject) => {
    setValues((previous) => {
      const target = previous[key];

      if (!target) {
        return previous;
      }

      return {
        ...previous,
        [key]: value,
      };
    });
  };

  const onDepositChange = (newDeposit: number) => {
    setDeposit(newDeposit);
  };

  const total =
    Object.values(values).reduce((sum, state) => {
      return sum + state.price * state.quantity;
    }, 0) + deposit || 0;

  useEffect(() => {
    const saveCurrentValues = () => {
      const updated: Portfolio = [];

      for (const [name, value] of Object.entries(valuesRef.current)) {
        const target = portfolio.find((holding) => holding.name === name);

        if (!target) {
          continue;
        }

        updated.push({
          ...target,
          ...value,
        });
      }

      savePortfolio(updated);
    };

    window.addEventListener(SAVE_CUSTOM_EVENT, saveCurrentValues);

    return () =>
      window.removeEventListener(SAVE_CUSTOM_EVENT, saveCurrentValues);
  }, [portfolio, savePortfolio]);

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
                        <HoldingRow
                          holding={holding}
                          total={total}
                          value={values[holding.name]}
                          onValueChange={onValueChange}
                        />
                        {isLast && isCash && (
                          <DepositRow
                            total={total}
                            deposit={deposit}
                            onDepositChange={onDepositChange}
                          />
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
            <TableFooter className="flex h-[50px] items-center border-0 bg-zinc-900 text-white">
              <p className="flex w-[100px] items-center justify-center">합계</p>
              <div className="flex-1" />
              <p className="flex flex-1 justify-end gap-3 text-lg">
                {getNumberWithCommas(total)}원
              </p>
              <div className="flex-1" />
              <div className="flex-1" />
              <div className="flex-1" />
            </TableFooter>
          </TableBody>
        </Table>
      </div>
    </OutletWrapper>
  );
};
