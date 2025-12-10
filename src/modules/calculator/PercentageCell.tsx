import { useTotalContext } from "@/context";
import { TableCell } from "@/modules/ui";
import { cn, getNumberWithCommas, getTargetAmount } from "@/utils";

interface CellWrapperProps extends WrapperComponent {
  percentage: number;
  goal?: string;
}

const CellWrapper = ({ children, percentage, goal = "" }: CellWrapperProps) => {
  return (
    <TableCell className="flex flex-1 flex-col items-center justify-center gap-3">
      <p className="rounded-full bg-zinc-700 px-3 py-1 text-white">
        목표: {percentage}% {goal}
      </p>
      {children}
    </TableCell>
  );
};

interface PercentageCellProps extends PortfolioInputObject {
  percentage: number;
  unit: string;
}

export const PercentageCell = ({
  percentage,
  unit,
  price,
  quantity,
}: PercentageCellProps) => {
  const { total } = useTotalContext();

  if (total === null) {
    return (
      <CellWrapper percentage={percentage}>
        <p className="text-lg text-zinc-500">-</p>
      </CellWrapper>
    );
  }

  const targetAmount = Math.floor(getTargetAmount(total ?? 0, percentage));
  const hasPrice = !!price;
  const targetQty = hasPrice ? Math.floor(targetAmount / price) : 0;
  const differenceQty = Math.floor(targetQty - quantity);

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
    <CellWrapper percentage={percentage} goal={hasPrice ? goal : ""}>
      <p
        className={cn(
          "text-xl font-normal text-zinc-500",
          status === "more" && hasPrice && "font-bold text-red-500",
          status === "less" && hasPrice && "font-bold text-blue-500",
        )}
      >
        {hasPrice
          ? (status === "more" ? "+" : "") +
            getNumberWithCommas(differenceQty) +
            unit
          : "0" + unit}
      </p>
    </CellWrapper>
  );
};
