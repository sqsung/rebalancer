import { useTotalContext } from "@/context";
import { PercentageCell } from "@/modules/calculator/PercentageCell";
import { Input, TableCell, TableRow } from "@/modules/ui";
import { getCurrentRatio, getNumberWithCommas } from "@/utils";
import { memo } from "react";

interface DepositRowProps {
  deposit: number;
  onDepositChange: (value: number) => void;
}

export const DepositRow = memo(
  ({ deposit, onDepositChange }: DepositRowProps) => {
    const { total } = useTotalContext();

    return (
      <TableRow className="flex h-[150px] w-full">
        <TableCell className="flex flex-1 flex-col items-center justify-center gap-1">
          <p className="text-xl font-bold">예수금</p>
        </TableCell>
        <TableCell className="flex flex-1 flex-col justify-center gap-3">
          <div className="flex items-center gap-1">
            <p className="w-[50px] font-bold">금액</p>
            <Input
              type="numeric"
              value={getNumberWithCommas(deposit)}
              onChange={(event) => {
                const value = +event.target.value.trim().replace(/,/g, "");

                if (isNaN(value) || value < 0) {
                  alert("예수금은 0원 이상이어야 합니다.");
                  return;
                }

                onDepositChange(value);
              }}
            />
          </div>
        </TableCell>
        <TableCell className="flex flex-1 items-center justify-center">
          <p className="text-xl font-bold">
            {getCurrentRatio(deposit, total ?? 0)}%
          </p>
        </TableCell>
        <PercentageCell
          percentage={0}
          unit="원"
          value={{
            price: deposit,
            quantity: 0,
          }}
        />
        <PercentageCell
          percentage={0}
          unit="원"
          value={{
            price: deposit,
            quantity: 0,
          }}
        />
      </TableRow>
    );
  },
);
