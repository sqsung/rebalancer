import { usePortfolioContext } from "@/context";
import { useToggle } from "@/hooks";
import { ConfirmDialog } from "@/modules/shared";
import { Button, Dialog, DialogTrigger } from "@/modules/ui";

export const ResetPortfolioButton = () => {
  const [isDialogOpen, [openDialog, closeDialog]] = useToggle();
  const { resetPortfolio } = usePortfolioContext();

  const onReset = () => {
    resetPortfolio();
    closeDialog();
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
