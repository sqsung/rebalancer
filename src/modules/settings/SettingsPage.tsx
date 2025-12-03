import { CATEGORIES } from "@/constants";
import { OutletWrapper } from "@/modules/shared/OutletWrapper";
import { AddHoldingButton, GroupedPortfolioSection } from "@/modules/settings";

export const SettingsPage = () => {
  return (
    <OutletWrapper>
      <div className="flex h-full gap-3">
        <ul className="flex flex-1 flex-col gap-3">
          <AddHoldingButton />
          {Object.keys(CATEGORIES).map((key, index) => (
            <GroupedPortfolioSection key={key + index} category={key} />
          ))}
        </ul>
        <div className="flex-1 rounded-xl border border-zinc-300 bg-white"></div>
      </div>
    </OutletWrapper>
  );
};
