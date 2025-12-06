import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { holdingSchema, type HoldingSchema } from "@/schema/holding.schema";
import { usePortfolio } from "@/context/PortfolioContext";
import { CATEGORIES } from "@/constants";
import { useToggle } from "@/hooks";
import { getPercentagesByCategory } from "@/utils";
import { toast } from "sonner";
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
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/ui";

export const AddHoldingButton = () => {
  const { portfolio, addHolding } = usePortfolio();
  const [isDialogOpen, [openDialog, closeDialog]] = useToggle();

  const form = useForm<HoldingSchema>({
    resolver: zodResolver(holdingSchema),
    defaultValues: {
      name: "",
      description: "",
      stable: 0,
      growth: 0,
      category: "stocks",
    },
  });

  const selectedCategory = useWatch({
    control: form.control,
    name: "category",
  });

  const { stable, growth } = getPercentagesByCategory(
    portfolio,
    selectedCategory,
  );

  const onSubmit = (values: HoldingSchema) => {
    addHolding({
      ...values,
      description: values.description || "",
      price: 0,
      holding: 0,
    });

    form.reset();
    closeDialog();

    const categoryInKorean = CATEGORIES[values.category];

    const id = toast(`새로운 ${categoryInKorean} 자산군 추가`, {
      description: `${values.name} 안정형 ${values.stable}%, 성장형 ${values.growth}%`,
      action: {
        label: "확인",
        onClick: () => toast.dismiss(id),
      },
    });
  };

  const closeAndClearErrors = () => {
    closeDialog();
    form.clearErrors();
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeAndClearErrors();
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
        <Form {...form}>
          <form
            noValidate={true}
            className="flex flex-col gap-5 py-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>종류</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stocks">주식</SelectItem>
                        <SelectItem value="bonds">국채</SelectItem>
                        <SelectItem value="alternatives">대체 투자</SelectItem>
                        <SelectItem value="cash">현금</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>자산군</FormLabel>
                  <FormControl>
                    <Input placeholder="한국 주식" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input placeholder="(KODEX 200)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <span>안정형 %</span>
                    <span className="text-zinc-500">가능: {100 - stable}%</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      max={100 - stable}
                      {...field}
                      onChange={(event) => {
                        const raw = event.target.value;

                        if (raw === "") {
                          field.onChange("");
                          form.clearErrors("stable");
                          return;
                        }

                        const value = +raw.replace(/^0+(?=\d)/, "");
                        const maxValue = 100 - stable;

                        const clampedValue = Math.min(value, maxValue);
                        field.onChange(clampedValue);

                        if (value > maxValue) {
                          form.setError("stable", {
                            type: "max",
                            message: `최대 ${maxValue}% 까지 설정할 수 있습니다.`,
                          });
                        } else {
                          form.clearErrors("stable");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="growth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <span>성장형 %</span>
                    <span className="text-zinc-500">가능: {100 - growth}%</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      max={100 - growth}
                      {...field}
                      onChange={(event) => {
                        const raw = event.target.value;

                        if (raw === "") {
                          field.onChange("");
                          form.clearErrors("growth");
                          return;
                        }

                        const value = +raw.replace(/^0+(?=\d)/, "");
                        const maxValue = 100 - growth;

                        const clamped = Math.min(value, maxValue);
                        field.onChange(clamped);

                        if (value > maxValue) {
                          form.setError("growth", {
                            type: "max",
                            message: `최대 ${maxValue}% 까지 설정할 수 있습니다.`,
                          });
                        } else {
                          form.clearErrors("growth");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-10">
              <Button
                onClick={closeAndClearErrors}
                type="button"
                variant="outline"
              >
                취소
              </Button>
              <Button type="submit" disabled={!form.formState.isValid}>
                저장
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
