import { CATEGORIES } from "@/constants";
import { GroupedPortfolioRow, SettingsHeader } from "@/modules/settings";

export const HoldingsSection = () => {
  return (
    <section className="flex flex-1 flex-col gap-3">
      <SettingsHeader />
      {Object.keys(CATEGORIES).map((key, index) => (
        <GroupedPortfolioRow key={key + index} category={key} />
      ))}
    </section>
  );
};
