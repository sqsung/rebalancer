import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with negative values";

const chartData = [
  { month: "January", visitors: 10000 },
  { month: "February", visitors: 205 },
  { month: "March", visitors: -207 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

const TargetChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel hideIndicator />}
        />
        <Bar dataKey="visitors">
          <LabelList position="top" dataKey="month" fillOpacity={1} />
          {chartData.map((item) => (
            <Cell
              key={item.month}
              fill={item.visitors > 0 ? "var(--chart-1)" : "var(--chart-2)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default TargetChart;

{
  /* <CardHeader>
        <CardTitle>Bar Chart - Negative</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */
}
