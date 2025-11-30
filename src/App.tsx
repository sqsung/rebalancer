import Classifier from "./components/Classifier";
import Sidebar from "./components/Sidebar";
import {
  Table,
  TableBody,
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
                목표
              </TableHead>
            </TableHeader>
            <TableBody className="flex h-full flex-col bg-white">
              <TableRow className="borer-zinc-100 flex w-full flex-1 border"></TableRow>
              <TableRow className="borer-zinc-100 flex w-full flex-1 border"></TableRow>
              <TableRow className="borer-zinc-100 flex w-full flex-1 border"></TableRow>
              <TableRow className="borer-zinc-100 flex w-full flex-1 border"></TableRow>
              <TableRow className="borer-zinc-100 flex w-full flex-1 border"></TableRow>
              <TableRow className="borer-zinc-100 flex w-full flex-1 border"></TableRow>
              <TableRow className="borer-zinc-100 flex w-full flex-1 border"></TableRow>
              <TableFooter className="mt-auto h-[50px] border-t border-zinc-300 bg-zinc-900"></TableFooter>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
