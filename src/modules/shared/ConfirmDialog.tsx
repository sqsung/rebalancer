import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  Button,
} from "@/modules/ui";

interface ConfirmDialogProps {
  title: string;
  subtitle?: string;
  isDestructive?: boolean;
  confirmMessage?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  title,
  subtitle,
  isDestructive = false,
  confirmMessage = "확인",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <DialogContent className="w-[350px] gap-10">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription className="whitespace-pre">
          {subtitle}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button
          onClick={onConfirm}
          variant={isDestructive ? "destructive" : "default"}
        >
          {confirmMessage}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
