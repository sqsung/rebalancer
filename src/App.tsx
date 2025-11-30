import { Button } from "./components/ui/button";
import { Table, TableHead, TableHeader } from "./components/ui/table";

const App = () => {
  return (
    <div className="flex h-full min-h-screen">
      <div className="flex flex-col bg-white p-3">
        <h1 className="text-2xl font-bold tracking-wide">PF/RB</h1>
        <Button className="mt-auto w-52">계산하기</Button>
      </div>
      <div className="flex-1 p-1">
        <div className="h-full w-full rounded-2xl bg-zinc-900 text-white">
          <Table>
            <TableHeader className="flex border-b border-zinc-700">
              <p className="w-[150px] py-2 text-center text-base font-bold">
                구분
              </p>
              <TableHead className="flex-1 py-2 text-center text-base font-bold text-white">
                자산군
              </TableHead>
              <TableHead className="flex-1 py-2 text-center text-base font-bold text-white">
                보유
              </TableHead>
              <TableHead className="flex-1 py-2 text-center text-base font-bold text-white">
                현재 비율
              </TableHead>
              <TableHead className="flex-1 py-2 text-center text-base font-bold text-white">
                성장형
              </TableHead>
              <TableHead className="flex-1 py-2 text-center text-base font-bold text-white">
                안정형
              </TableHead>
            </TableHeader>
            {/* <TableBody></TableBody> */}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
