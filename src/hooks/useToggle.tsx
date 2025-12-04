import { useState } from "react";

type ToggleHookTuple = [boolean, [() => void, () => void]];

export const useToggle = (defaultState?: boolean): ToggleHookTuple => {
  const [toggleStatus, setToggleStatus] = useState(
    typeof defaultState === "boolean" ? defaultState : false,
  );

  const on = () => {
    setToggleStatus(true);
  };

  const off = () => {
    setToggleStatus(false);
  };

  return [toggleStatus, [on, off]];
};
