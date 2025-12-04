import { usePortfolio } from "@/context/PortfolioContext";
import { useToggle } from "@/hooks";
import { ConfirmDialog } from "@/modules/shared/ConfirmDialog";
import { Button, Dialog, DialogTrigger } from "@/ui";
import { toast } from "sonner";

export const ResetPortfolioButton = () => {
  const [isDialogOpen, [openDialog, closeDialog]] = useToggle();
  const { resetPortfolio } = usePortfolio();

  const onReset = () => {
    resetPortfolio();
    closeDialog();

    const id = toast("포트폴리오를 초기화 했습니다", {
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
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={openDialog}
          className="ml-auto flex gap-1"
        >
          초기화
        </Button>
      </DialogTrigger>
      <ConfirmDialog
        title="초기화"
        subtitle={
          "포트폴리오를 초기화 하시겠습니까?\n이 작업은 되돌릴 수 없습니다."
        }
        isDestructive={true}
        onCancel={closeDialog}
        onConfirm={onReset}
      />
    </Dialog>
  );
};
