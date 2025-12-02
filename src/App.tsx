import Classifier from "./components/Classifier";
import TableRow from "./components/TableRow";
import Sidebar from "./components/Sidebar";
import TableHeader from "./components/TableHeader";
import { Table, TableBody, TableFooter } from "./components/ui/table";
import { usePortfolio } from "./components/context/PortfolioContext";

const App = () => {
  const { portfolio } = usePortfolio();

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <div className="flex-1 px-1 py-3">
        <div className="flex h-full w-full overflow-hidden rounded-2xl border border-zinc-300 bg-zinc-100">
          <Classifier />
          <Table className="flex h-full w-full flex-col">
            <TableHeader />
            <TableBody className="flex h-full flex-col bg-white">
              {portfolio.map((item) => (
                <TableRow
                  key={item.description}
                  name={item.name}
                  description={item.description}
                />
              ))}

              <TableFooter className="mt-auto h-[50px] border-t border-zinc-300 bg-zinc-900"></TableFooter>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
