import { cn } from "@/utils";

interface OutletWrapperProps extends WrapperComponent {
  className?: string;
}

export const OutletWrapper = ({
  className = "",
  children,
}: OutletWrapperProps) => {
  return (
    <div className={cn("relative me-1 flex-1 py-3", className)}>{children}</div>
  );
};
