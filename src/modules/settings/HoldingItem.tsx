import { DeleteHoldingButton, UpdateHoldingButton } from "@/modules/settings";
import { cn } from "@/utils";

interface PercentageProps {
  variant: PercentageType;
  percentage: number;
}

const Percentage = ({ variant, percentage }: PercentageProps) => {
  const isGrowth = variant === "growth";
  const label = isGrowth ? "성장" : "안정";

  return (
    <div className="flex gap-1 text-zinc-500">
      <span>{label}</span>
      <span
        className={cn("font-bold", isGrowth ? "text-red-500" : "text-blue-500")}
      >
        {percentage}%
      </span>
    </div>
  );
};

interface HoldingItemProps {
  holding: Holding;
  isLast: boolean;
}

export const HoldingItem = ({ holding, isLast }: HoldingItemProps) => {
  return (
    <li
      className={cn(
        "flex justify-between py-3",
        !isLast && "border-b border-zinc-100",
      )}
    >
      <div className="flex flex-col">
        <span className="font-bold">{holding.name}</span>
        <span className="text-zinc-500">{holding.description}</span>
        <div className="mt-3 flex gap-3">
          <Percentage variant="stable" percentage={holding.stable} />
          <Percentage variant="growth" percentage={holding.growth} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <UpdateHoldingButton holding={holding} />
        <DeleteHoldingButton name={holding.name} />
      </div>
    </li>
  );
};
