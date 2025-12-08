import { OutletWrapper } from "@/modules/shared/OutletWrapper";
import { PortfolioChartSection, HoldingsSection } from "@/modules/settings";

export const SettingsPage = () => {
  return (
    <OutletWrapper className="flex h-full gap-3">
      <HoldingsSection />
      <PortfolioChartSection />
    </OutletWrapper>
  );
};
