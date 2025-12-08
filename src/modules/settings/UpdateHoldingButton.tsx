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
import { Pencil } from "lucide-react";

interface UpdateHoldingButtonProps {
  holding: Holding;
}

export const UpdateHoldingButton = ({ holding }: UpdateHoldingButtonProps) => {
  const { updateHolding } = usePortfolioContext();
  const [isDialogOpen, [openDialog, closeDialog]] = useToggle();

  const onSubmit = (values: HoldingSchema) => {
    updateHolding(holding.name, {
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
        <Button
          variant="ghost"
          onClick={openDialog}
          className="ml-auto flex gap-1"
        >
          <Pencil className="text-zinc-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>자산군 수정</DialogTitle>
          <DialogDescription>수정할 정보를 입력해 주세요.</DialogDescription>
        </DialogHeader>
        <HoldingForm
          initialHolding={holding}
          onSubmit={onSubmit}
          onCancel={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
};
