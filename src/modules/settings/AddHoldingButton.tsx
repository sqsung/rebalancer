import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
} from "@/ui";

export const AddHoldingButton = () => {
  const [form, setForm] = useState<Omit<Holding, "price" | "holding">>({
    name: "",
    description: "",
    growth: 0,
    stable: 0,
    category: "stocks",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto flex gap-1">
          <span>추가하기</span>
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>포트폴리오 항목 추가</DialogTitle>
          <DialogDescription>
            새로운 항목에 대한 정보를 입력해 주세요.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-5 py-5">
          <div className="flex flex-col gap-1">
            <span className="font-bold">자산명</span>
            <Input placeholder="한국 주식" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">설명</span>
            <Input placeholder="(KODEX 200)" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">안정형(%)</span>
            <Input
              placeholder="0"
              type="number"
              max={100}
              min={0}
              className="w-1/2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">성장형(%)</span>
            <Input
              placeholder="0"
              type="number"
              max={100}
              min={0}
              className="w-1/2"
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
