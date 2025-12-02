import { useLocation, useNavigate } from "react-router-dom";
import { RefreshCcw, Settings2 } from "lucide-react";
import { Button } from "@/ui";
import { PATHS } from "@/constants";
import clsx from "clsx";

const BUTTONS = [
  { label: "리밸런싱", icon: <RefreshCcw />, path: PATHS.calculator },
  { label: "설정", icon: <Settings2 />, path: PATHS.settings },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onCalculate = () => {
    window.dispatchEvent(new CustomEvent("calculator:run"));
  };

  return (
    <div className="flex flex-col gap-3 bg-white p-3">
      <h1 className="text-2xl font-bold tracking-wide">PF/RB</h1>
      {BUTTONS.map((button) => {
        const isActive = button.path === pathname;

        return (
          <Button
            key={button.label}
            variant={isActive ? "default" : "ghost"}
            onClick={() => navigate(button.path)}
            className={clsx(
              "w-52 justify-start",
              isActive
                ? "bg-zinc-200 text-black hover:bg-zinc-300 active:bg-zinc-300"
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
        onClick={onCalculate}
        className="mt-auto w-52"
      >
        계산하기
      </Button>
    </div>
  );
};
