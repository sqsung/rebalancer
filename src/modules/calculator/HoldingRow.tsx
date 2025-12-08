import { PercentageCell } from "@/modules/calculator/PercentageCell";
import { Input, TableCell, TableRow } from "@/ui";
import { getCurrentRatio, getNumberWithCommas } from "@/utils";
import type { ChangeEvent } from "react";

interface HoldingRowProps {
  holding: Holding;
  total: number;
  value: PortfolioInputObject;
  onValueChange: (name: string, value: PortfolioInputObject) => void;
}

export const HoldingRow = ({
  holding,
  value,
  total,
  onValueChange,
}: HoldingRowProps) => {
  const onChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: PortfolioInputField,
  ) => {
    const numeric = +event.target.value.trim().replace(/,/g, "");

    if (isNaN(numeric) || numeric < 0) {
      alert(`${field === "price" ? "가격" : "보유량"}은 0 이상이어야 합니다.`);
      return;
    }

    onValueChange(holding.name, {
      ...value,
      [field]: numeric,
    });
  };

  const rowAmount = value.price * value.quantity;

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
            value={getNumberWithCommas(value.price)}
            onChange={(event) => onChange(event, "price")}
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="w-[50px] font-bold">보유량</p>
          <Input
            type="numeric"
            value={getNumberWithCommas(value.quantity)}
            onChange={(event) => onChange(event, "quantity")}
          />
        </div>
      </TableCell>

      <TableCell className="flex flex-1 items-center justify-center">
        <p className="text-xl font-bold">
          {getCurrentRatio(rowAmount, total)}%
        </p>
      </TableCell>

      <PercentageCell percentage={holding.stable} unit="주" />
      <PercentageCell percentage={holding.growth} unit="주" />
    </TableRow>
  );
};
