import { useLocation, useNavigate } from "react-router-dom";
import { RefreshCcw, Settings2 } from "lucide-react";
import { Button } from "@/modules/ui";
import { PATHS, CALCULATE_CUSTOM_EVENT } from "@/constants";
import clsx from "clsx";

const BUTTONS = [
  { label: "리밸런싱", icon: <RefreshCcw />, path: PATHS.calculator },
  { label: "설정", icon: <Settings2 />, path: PATHS.settings },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const rebalance = () => {
    window.dispatchEvent(new CustomEvent(CALCULATE_CUSTOM_EVENT));
  };

  return (
    <div className="relative flex flex-col gap-3">
      <div className="sticky top-0 flex h-screen flex-col gap-3 p-3">
        <h1 className="text-2xl font-bold tracking-wide">PF/RB</h1>
        {BUTTONS.map((button) => {
          const isActive = button.path === pathname;

          return (
            <Button
              key={button.label}
              variant={isActive ? "default" : "ghost"}
              onClick={() => {
                navigate(button.path);
              }}
              className={clsx(
                "w-52 justify-start",
                isActive
                  ? "bg-zinc-200 text-black hover:bg-zinc-200 active:bg-zinc-200"
                  : "variant-ghost hover:bg-zinc-100",
              )}
            >
              {button.icon}
              <span>{button.label}</span>
            </Button>
          );
        })}
        <Button
          disabled={pathname !== PATHS.calculator}
          onClick={rebalance}
          className="mt-auto w-52"
        >
          계산하기
        </Button>
      </div>
    </div>
  );
};
