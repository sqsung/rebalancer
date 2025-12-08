import { TableCell } from "@/modules/ui";
import { cn, getNumberWithCommas, getTargetAmount } from "@/utils";

interface PercentageCellProps {
  percentage: number;
  total: number;
  unit: string;
  value: PortfolioInputObject;
}

export const PercentageCell = ({
  total,
  percentage,
  unit,
  value,
}: PercentageCellProps) => {
  const targetAmount = Math.floor(getTargetAmount(total, percentage));
  const hasPrice = !!value.price;
  const targetQty = hasPrice ? Math.floor(targetAmount / value.price) : 0;
  const differenceQty = Math.floor(targetQty - value.quantity);

  const status = (() => {
    if (differenceQty === 0) {
      return "equal";
    }

    if (differenceQty > 0) {
      return "more";
    }

    return "less";
  })();
  const goal = `> ${getNumberWithCommas(targetQty)}${unit}`;

  return (
    <TableCell className="flex flex-1 flex-col items-center justify-center gap-3">
      <p className="rounded-full bg-zinc-700 px-3 py-1 text-white">
        목표: {percentage}%{hasPrice && ` ${goal}`}
      </p>
      <p
        className={cn(
          "text-xl font-bold text-zinc-500",
          !hasPrice && "text-base font-normal",
          status === "more" && hasPrice && "text-red-500",
          status === "less" && hasPrice && "text-blue-500",
        )}
      >
        {hasPrice
          ? (status === "more" ? "+" : "") +
            getNumberWithCommas(differenceQty) +
            unit
          : "(가격 설정 필요)"}
      </p>
    </TableCell>
  );
};
