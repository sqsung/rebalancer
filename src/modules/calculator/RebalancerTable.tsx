import { useTotalContext } from "@/context";
import { OutletWrapper } from "@/modules/shared";
import { Table, TableFooter, TableHead, TableHeader } from "@/modules/ui";
import { cn, getNumberWithCommas } from "@/utils";

const Header = () => {
  const labels = ["구분", "자산군", "수량", "현재 비율", "안정형", "성장형"];

  return (
    <TableHeader className="border-b-none flex border border-zinc-900 bg-zinc-900">
      {labels.map((label, index) => (
        <TableHead
          key={label}
          className={cn(
            "flex items-center justify-center py-2 text-sm font-bold text-white",
            index === 0 ? "w-[100px]" : "flex-1",
          )}
        >
          {label}
        </TableHead>
      ))}
    </TableHeader>
  );
};

interface FooterProps {
  total: number | null;
}

const Footer = ({ total }: FooterProps) => {
  return (
    <TableFooter className="flex h-[50px] items-center border border-zinc-900 bg-zinc-900 px-4 text-white">
      <p className="w-[100px] text-center">합계</p>
      <p className="w-full px-10 text-end text-lg">
        {total === null ? "-" : `${getNumberWithCommas(total)}원`}
      </p>
    </TableFooter>
  );
};

export const RebalancerTable = ({ children }: WrapperComponent) => {
  const { total } = useTotalContext();

  return (
    <OutletWrapper>
      <Table className="flex h-full min-h-[calc(100vh-1.5rem)] w-full flex-col overflow-hidden rounded-2xl border bg-zinc-100">
        <Header />
        {children}
        <Footer total={total} />
      </Table>
    </OutletWrapper>
  );
};
