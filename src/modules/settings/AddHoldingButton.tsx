import { Button } from "@/modules/ui";
import { Info } from "lucide-react";

export const AddHoldingButton = () => {
  return (
    <div className="flex items-center justify-between rounded-md border border-zinc-300 p-2">
      <div className="flex items-center gap-2">
        <Info size={16} />
        <span>새로운 항목을 추가하고 싶으신가요?</span>
      </div>
      <Button className="px-5 py-3">추가하기</Button>
    </div>
  );
};
