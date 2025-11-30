import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-white p-3">
      <h1 className="text-2xl font-bold tracking-wide">PF/RB</h1>
      <Button className="mt-auto w-52">계산하기</Button>
    </div>
  );
};

export default Sidebar;
