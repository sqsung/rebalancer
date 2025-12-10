import { Fragment, useCallback, useMemo, useState } from "react";
import { usePortfolioContext } from "@/context";
import { TableBody } from "@/modules/ui";
import {
  HoldingRow,
  Classifier,
  DepositRow,
  RebalancerTable,
} from "@/modules/calculator";
import { checkIsValidCategory, cn, getGroupedPortfolio } from "@/utils";

export const CalculatorPage = () => {
  const { portfolio } = usePortfolioContext();

  const grouped = useMemo(() => getGroupedPortfolio(portfolio), [portfolio]);

  const [deposit, setDeposit] = useState(0);
  const [values, setValues] = useState(() => {
    return Object.fromEntries(
      portfolio.map((holding) => [
        holding.name,
        { price: holding.price, quantity: holding.quantity },
      ]),
    );
  });

  const onValueChange = useCallback(
    (key: string, value: PortfolioInputObject) => {
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
    },
    [],
  );

  const onDepositChange = useCallback((newDeposit: number) => {
    setDeposit(newDeposit);
  }, []);

  return (
    <RebalancerTable>
      <TableBody className="flex h-full flex-1 flex-col bg-white">
        {Object.entries(grouped).map(([category, holdings], index) => {
          if (!checkIsValidCategory(category)) {
            return null;
          }

          return (
            <div key={category} className="flex flex-1">
              <Classifier
                category={category}
                isEmpty={!holdings.length}
                className={cn(
                  index + 1 === 4 && "border-b",
                  index === 0 && "border-t",
                )}
              />
              <div className="flex flex-1 flex-col justify-center">
                {holdings.map((holding, index) => {
                  const isLast = index + 1 === holdings.length;
                  const isCash = category === "cash";

                  return (
                    <Fragment key={holding.name}>
                      <HoldingRow
                        holding={holding}
                        value={values[holding.name]}
                        onValueChange={onValueChange}
                      />
                      {isLast && isCash && (
                        <DepositRow
                          deposit={deposit}
                          onDepositChange={onDepositChange}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </TableBody>
    </RebalancerTable>
  );
};
