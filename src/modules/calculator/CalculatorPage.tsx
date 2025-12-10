import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  HoldingRow,
  Classifier,
  DepositRow,
  RebalancerTable,
} from "@/modules/calculator";
import { TableBody } from "@/modules/ui";
import { usePortfolioContext, useTotalContext } from "@/context";
import { checkIsValidCategory, cn, getGroupedPortfolio } from "@/utils";
import { CALCULATE_CUSTOM_EVENT } from "@/constants";

export const CalculatorPage = () => {
  const { portfolio, savePortfolio } = usePortfolioContext();
  const { total, onTotalChange } = useTotalContext();
  const grouped = useMemo(() => getGroupedPortfolio(portfolio), [portfolio]);

  const [deposit, setDeposit] = useState(0);
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      portfolio.map((holding) => [
        holding.name,
        { price: holding.price, quantity: holding.quantity },
      ]),
    ),
  );

  const valuesRef = useRef(values);
  const depositRef = useRef(deposit);

  useEffect(() => {
    valuesRef.current = values;
    depositRef.current = deposit;
  }, [values, deposit]);

  const onRebalance = useCallback(() => {
    const valuesArray = Object.values(valuesRef.current);

    if (valuesArray.find((item) => !item.price)) {
      alert("모든 가격을 설정해 주세요");
      return;
    }

    const updated: Portfolio = [];
    const holdingSum = valuesArray.reduce((sum, holding) => {
      return sum + holding.price * holding.quantity;
    }, 0);
    const total = holdingSum + depositRef.current || 0;

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

    savePortfolio(updated, false);
    onTotalChange(total);
  }, [portfolio, savePortfolio, onTotalChange]);

  useEffect(() => {
    window.addEventListener(CALCULATE_CUSTOM_EVENT, onRebalance);

    return () => {
      window.removeEventListener(CALCULATE_CUSTOM_EVENT, onRebalance);
    };
  }, [onRebalance]);

  const onValueChange = useCallback(
    (key: string, value: PortfolioInputObject) => {
      if (total) {
        onTotalChange(null);
      }
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
    [onTotalChange, total],
  );

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
                        {...values[holding.name]}
                        holding={holding}
                        onValueChange={onValueChange}
                      />
                      {isLast && isCash && (
                        <DepositRow
                          deposit={deposit}
                          onDepositChange={setDeposit}
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
