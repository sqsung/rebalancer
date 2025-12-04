import { Trash } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ConfirmDialog } from "@/modules/shared/ConfirmDialog";
import { Button, Dialog, DialogTrigger } from "@/modules/ui";
import { toast } from "sonner";
import { cn } from "@/utils";
import { useToggle } from "@/hooks";

interface DeleteHoldingButtonProps {
  name: string;
}

const DeleteHoldingButton = ({ name }: DeleteHoldingButtonProps) => {
  const { deleteHolding } = usePortfolio();
  const [isDialogOpen, [openDialog, closeDialog]] = useToggle();

  const onDelete = () => {
    deleteHolding(name);

    const id = toast("삭제했습니다", {
      action: {
        label: "확인",
        onClick: () => toast.dismiss(id),
      },
    });
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog();
        }
      }}
    >
      <DialogTrigger asChild={true}>
        <Button
          onClick={openDialog}
          variant="ghost"
          className="ml-auto flex items-center gap-3"
        >
          <Trash className="text-zinc-500" />
        </Button>
      </DialogTrigger>
      <ConfirmDialog
        title="자산군 삭제"
        isDestructive={true}
        confirmMessage="삭제"
        subtitle={"정말 삭제하시겠습니까?\n삭제한 데이터는 복원할 수 없습니다."}
        onCancel={closeDialog}
        onConfirm={onDelete}
      />
    </Dialog>
  );
};

interface PercentageProps {
  variant: PercentageType;
  percentage: number;
}

const Percentage = ({ variant, percentage }: PercentageProps) => {
  const label = variant === "growth" ? "성장" : "안정";

  return (
    <div className="flex gap-1 text-zinc-500">
      <span>{label}</span>
      <span className="font-bold text-orange-500">{percentage}%</span>
    </div>
  );
};

interface HoldingItemProps {
  holding: Holding;
  isLast: boolean;
}

export const HoldingItem = ({ holding, isLast }: HoldingItemProps) => {
  return (
    <li
      className={cn(
        "flex justify-between py-3",
        !isLast && "border-b border-zinc-100",
      )}
    >
      <div className="flex flex-col">
        <span className="font-bold">{holding.name}</span>
        <span className="text-zinc-500">{holding.description}</span>
        <div className="mt-3 flex gap-3">
          <Percentage variant="stable" percentage={holding.stable} />
          <Percentage variant="growth" percentage={holding.growth} />
        </div>
      </div>
      <DeleteHoldingButton name={holding.name} />
    </li>
  );
};
