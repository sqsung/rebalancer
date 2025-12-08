import { type HoldingSchema } from "@/schema";
import { usePortfolioContext } from "@/context";
import { useToggle } from "@/hooks";
import { HoldingForm } from "@/modules/settings";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
} from "@/modules/ui";

export const AddHoldingButton = () => {
  const { addHolding } = usePortfolioContext();
  const [isDialogOpen, [openDialog, closeDialog]] = useToggle();

  const onSubmit = (values: HoldingSchema) => {
    addHolding({
      ...values,
      description: values.description || "",
      price: 0,
      quantity: 0,
    });

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
        <Button onClick={openDialog} className="ml-auto flex gap-1">
          추가하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>자산군 추가</DialogTitle>
          <DialogDescription>
            새로운 자산군에 대한 정보를 입력해 주세요.
          </DialogDescription>
        </DialogHeader>
        <HoldingForm onSubmit={onSubmit} onCancel={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};
