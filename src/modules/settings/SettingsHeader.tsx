import { AddHoldingButton, ResetPortfolioButton } from "@/modules/settings";

export const SettingsHeader = () => {
  return (
    <div className="flex items-center gap-1">
      <p className="mr-auto text-lg font-bold">나의 자산군</p>
      <div className="flex gap-1">
        <ResetPortfolioButton />
        <AddHoldingButton />
      </div>
    </div>
  );
};
