import { PercentageCell } from "@/modules/calculator/PercentageCell";
import { Input, TableCell, TableRow } from "@/modules/ui";

export const DepositRow = () => {
  return (
    <TableRow className="flex h-[150px] w-full">
      <TableCell className="flex flex-1 flex-col items-center justify-center gap-1">
        <p className="text-xl font-bold">예수금</p>
      </TableCell>

      <TableCell className="flex flex-1 flex-col justify-center gap-3">
        <div className="flex items-center gap-1">
          <p className="w-[50px] font-bold">금액</p>
          <Input type="numeric" />
        </div>
      </TableCell>

      <TableCell className="flex flex-1 items-center justify-center">
        <p className="text-xl font-bold">77.88%</p>
      </TableCell>

      <PercentageCell percentage={0} unit="원" />
      <PercentageCell percentage={0} unit="원" />
    </TableRow>
  );
};
