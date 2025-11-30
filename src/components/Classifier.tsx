import { TableHead } from "./ui/table";

const VARIANTS = [
  {
    label: "주식",
    className: "h-2/7",
  },
  {
    label: "대체 투자",
    className: "h-2/7",
  },
  {
    label: "국채",
    className: "h-1/7",
  },
  {
    label: "인출금",
    className: "h-2/7",
  },
];

const Classifier = () => {
  return (
    <div className="flex w-[120px] flex-col border-e border-zinc-700">
      <TableHead className="flex items-center justify-center border-b border-zinc-700 bg-zinc-900 py-2 text-sm font-bold text-white">
        구분
      </TableHead>
      <div className="flex flex-1 flex-col text-sm text-zinc-300">
        {VARIANTS.map(({ label, className }) => (
          <p
            key={label}
            className={`flex items-center justify-center border-b border-zinc-700 bg-zinc-800 text-sm font-bold ${className}`}
          >
            {label}
          </p>
        ))}
        <p className="flex h-[50px] items-center justify-center bg-zinc-900 text-sm font-bold">
          합계
        </p>
      </div>
    </div>
  );
};

export default Classifier;
