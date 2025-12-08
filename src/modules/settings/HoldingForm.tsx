import type { ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { holdingSchema, type HoldingSchema } from "@/schema";
import { usePortfolioContext } from "@/context";
import { getTotalPercentages } from "@/utils";
import {
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
} from "@/modules/ui";

interface HoldingFormProps {
  initialHolding?: Holding;
  onSubmit: (holding: HoldingSchema) => void;
  onCancel: () => void;
}

export const HoldingForm = ({
  initialHolding,
  onSubmit,
  onCancel,
}: HoldingFormProps) => {
  const { portfolio } = usePortfolioContext();

  const form = useForm<HoldingSchema>({
    resolver: zodResolver(holdingSchema),
    defaultValues: {
      name: "",
      description: "",
      stable: 0,
      growth: 0,
      category: "stocks",
      ...initialHolding,
    },
  });

  const closeAndClearErrors = () => {
    onCancel();
    form.clearErrors();
  };

  const { stable, growth } = getTotalPercentages(portfolio);

  const onPercentageChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<HoldingSchema, "stable" | "growth">,
  ) => {
    const type = field.name;
    const raw = event.target.value;

    if (raw === "") {
      field.onChange("");
      form.clearErrors(type);
      return;
    }

    const numeric = +raw.replace(/^0+(?=\d)/, "");

    if (isNaN(numeric)) {
      return;
    }

    const isGrowth = type === "growth";
    const max = 100 - (isGrowth ? growth : stable);
    const clamped = Math.min(numeric, max);

    if (numeric > max) {
      alert(
        `${isGrowth ? "성장형" : "안정형"}은 현재 ${max}%까지 설정 가능합니다`,
      );
    }

    field.onChange(clamped);
  };

  return (
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
                  onChange={(event) => onPercentageChange(event, field)}
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
                  onChange={(event) => onPercentageChange(event, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-10 flex justify-end gap-2">
          <Button onClick={closeAndClearErrors} type="button" variant="outline">
            취소
          </Button>
          <Button type="submit" disabled={!form.formState.isValid}>
            저장
          </Button>
        </div>
      </form>
    </Form>
  );
};
