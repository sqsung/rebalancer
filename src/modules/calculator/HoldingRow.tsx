import { memo, type ChangeEvent } from "react";
import { useTotalContext } from "@/context";
import { getCurrentRatio, getNumberWithCommas } from "@/utils";
import { PercentageCell } from "@/modules/calculator";
import { Input, TableCell, TableRow } from "@/modules/ui";

interface HoldingRowProps extends PortfolioInputObject {
  holding: Holding;
  onValueChange: (name: string, value: PortfolioInputObject) => void;
}

export const HoldingRow = memo(
  ({ holding, price, quantity, onValueChange }: HoldingRowProps) => {
    const { total } = useTotalContext();
    const rowAmount = price * quantity;

    const onChange = (
      event: ChangeEvent<HTMLInputElement>,
      field: PortfolioInputField,
    ) => {
      const numeric = +event.target.value.trim().replace(/,/g, "");

      if (isNaN(numeric) || numeric < 0) {
        alert(`${field === "price" ? "가격" : "수량"}은 0 이상이어야 합니다.`);
        return;
      }

      onValueChange(holding.name, {
        price,
        quantity,
        [field]: numeric,
      });
    };

    return (
      <TableRow className="flex h-[150px] w-full">
        <TableCell className="flex flex-1 flex-col items-center justify-center gap-1">
          <p className="text-xl font-bold">{holding.name}</p>
          <p className="text-sm text-zinc-700">{holding.description}</p>
        </TableCell>
        <TableCell className="flex flex-1 flex-col justify-center gap-3">
          <div className="flex items-center gap-1">
            <p className="w-[50px] font-bold">가격</p>
            <Input
              type="numeric"
              value={getNumberWithCommas(price)}
              onChange={(event) => onChange(event, "price")}
            />
          </div>
          <div className="flex items-center gap-1">
            <p className="w-[50px] font-bold">수량</p>
            <Input
              type="numeric"
              value={getNumberWithCommas(quantity)}
              onChange={(event) => onChange(event, "quantity")}
            />
          </div>
        </TableCell>
        <TableCell className="flex flex-1 items-center justify-center">
          <p className="text-xl font-bold">
            {getCurrentRatio(rowAmount, total ?? 0)}%
          </p>
        </TableCell>
        <PercentageCell
          unit="주"
          percentage={holding.stable}
          price={price}
          quantity={quantity}
        />
        <PercentageCell
          unit="주"
          percentage={holding.growth}
          price={price}
          quantity={quantity}
        />
      </TableRow>
    );
  },
);
