import { FolderOpen } from "lucide-react";

interface EmptyFallbackProps {
  title?: string;
  message?: string;
}

export const EmptyFallback = ({
  title = "데이터 없음",
  message = "관련 데이터를 찾을 수 없습니다. 나중에 다시 시도해 주세요",
}: EmptyFallbackProps) => {
  return (
    <div className="my-8 flex flex-col items-center gap-3">
      <FolderOpen />
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-sm text-zinc-500">{message}</p>
      </div>
    </div>
  );
};
