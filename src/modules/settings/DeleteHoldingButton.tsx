import { Trash } from "lucide-react";
import { usePortfolioContext } from "@/context";
import { ConfirmDialog } from "@/modules/shared";
import { Button, Dialog, DialogTrigger } from "@/modules/ui";
import { useToggle } from "@/hooks";

interface DeleteHoldingButtonProps {
  name: string;
}

export const DeleteHoldingButton = ({ name }: DeleteHoldingButtonProps) => {
  const { deleteHolding } = usePortfolioContext();
  const [isDialogOpen, [openDialog, closeDialog]] = useToggle();

  const onDelete = () => {
    deleteHolding(name);
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
