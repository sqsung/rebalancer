import { TableFooter as BaseTableFooter } from "@/modules/ui";
import { getNumberWithCommas } from "@/utils";

interface TableFooterProps {
  total: number;
}

export const TableFooter = ({ total }: TableFooterProps) => {
  return (
    <BaseTableFooter className="flex h-[50px] items-center border-0 bg-zinc-900 text-white">
      <p className="flex w-[100px] items-center justify-center">합계</p>
      <div className="flex-1" />
      <p className="flex flex-1 justify-end gap-3 text-lg">
        {getNumberWithCommas(total)}원
      </p>
      <div className="flex-1" />
      <div className="flex-1" />
      <div className="flex-1" />
    </BaseTableFooter>
  );
};
