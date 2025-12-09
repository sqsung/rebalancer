import { CATEGORIES } from "@/constants";
import { cn } from "@/utils";
import { memo } from "react";

interface ClassifierProps {
  category: PortfolioCategory;
  isEmpty: boolean;
  className?: string;
}

export const Classifier = memo(
  ({ category, isEmpty, className = "" }: ClassifierProps) => {
    if (isEmpty) {
      return null;
    }

    const categoryInKorean = CATEGORIES[category];

    return (
      <span
        className={cn(
          "flex w-[100px] shrink-0 items-center justify-center border-b border-zinc-700 bg-zinc-900 text-sm font-bold text-white",
          className,
        )}
      >
        {categoryInKorean}
      </span>
    );
  },
);
