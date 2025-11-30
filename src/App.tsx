import Classifier from "./components/Classifier";
import Sidebar from "./components/Sidebar";
import { Input } from "./components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

const App = () => {
  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <div className="flex-1 px-1 py-3">
        <div className="flex h-full w-full overflow-hidden rounded-2xl border border-zinc-300 bg-zinc-100">
          <Classifier />
          <Table className="flex h-full w-full flex-col">
            <TableHeader className="flex border-b border-zinc-300 bg-zinc-900">
              <TableHead className="flex flex-1 items-center justify-center py-2 text-sm font-bold text-white">
                자산군
              </TableHead>
              <TableHead className="flex flex-1 items-center justify-center py-2 text-sm font-bold text-white">
                보유
              </TableHead>
              <TableHead className="flex flex-1 items-center justify-center py-2 text-sm font-bold text-white">
                현재 비율
              </TableHead>
              <TableHead className="flex flex-1 items-center justify-center py-2 text-sm font-bold text-white">
                안정형
              </TableHead>
              <TableHead className="flex flex-1 items-center justify-center py-2 text-sm font-bold text-white">
                성장형
              </TableHead>
            </TableHeader>
            <TableBody className="flex h-full flex-col bg-white">
              <TableRow className="flex w-full flex-1">
                <TableCell className="flex flex-1 flex-col items-center justify-center gap-1">
                  <p className="text-xl font-bold">미국 주식 (UH)</p>
                  <p className="text-sm text-zinc-700">
                    (TIGER 미국배당다우존스)
                  </p>
                </TableCell>

                <TableCell className="flex flex-1 flex-col justify-center gap-3">
                  <div className="flex items-center gap-1">
                    <p className="w-[50px] font-bold">가격</p>
                    <Input type="numeric" />
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="w-[50px] font-bold">보유량</p>
                    <Input type="numeric" />
                  </div>
                </TableCell>

                <TableCell className="flex flex-1 items-center justify-center">
                  <p className="text-xl font-bold">77.88%</p>
                </TableCell>

                <TableCell className="flex flex-1 flex-col items-center justify-center gap-1">
                  <p>{"24% > 3,100주"}</p>
                  <p className="text-xl font-bold">+2,191주</p>
                </TableCell>

                <TableCell className="flex flex-1 flex-col items-center justify-center gap-1">
                  <p>{"24% > 3,100주"}</p>
                  <p className="text-xl font-bold">+2,191주</p>
                </TableCell>
              </TableRow>
              <TableRow className="flex w-full flex-1"></TableRow>
              <TableRow className="flex w-full flex-1"></TableRow>
              <TableRow className="flex w-full flex-1"></TableRow>
              <TableRow className="flex w-full flex-1"></TableRow>
              <TableRow className="flex w-full flex-1"></TableRow>
              <TableRow className="flex w-full flex-1"></TableRow>
              <TableFooter className="mt-auto h-[50px] border-t border-zinc-300 bg-zinc-900"></TableFooter>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
