import { Button } from "./ui/button";
import { Calculator, Settings2 } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-3 bg-white p-3">
      <h1 className="text-2xl font-bold tracking-wide">PF/RB</h1>
      <Button
        className="w-52 justify-start bg-zinc-200 text-black"
        variant="default"
      >
        <Calculator></Calculator>
        계산기
      </Button>
      <Button className="w-52 justify-start" variant="ghost">
        <Settings2 />
        설정
      </Button>
      <Button className="mt-auto w-52">계산하기</Button>
    </div>
  );
};

export default Sidebar;
