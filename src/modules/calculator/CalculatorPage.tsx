import { useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Table, TableBody, TableFooter } from "@/ui";
import { OutletWrapper } from "@/modules/shared";
import { TableRow, Classifier, TableHeader } from "@/modules/calculator";

export const CalculatorPage = () => {
  const { portfolio } = usePortfolio();

  const rebalance = () => {
    alert("리밸런싱 시작!!");
  };

  useEffect(() => {
    window.addEventListener("calculator:run", rebalance);

    return () => window.removeEventListener("calculator:run", rebalance);
  }, []);

  return (
    <OutletWrapper>
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
    </OutletWrapper>
  );
};
