import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/ui";
import { usePortfolio } from "@/context/PortfolioContext";

const chartConfig = {
  value: {
    label: "비율",
  },
} satisfies ChartConfig;

export const PortfolioChartSection = () => {
  const { portfolio } = usePortfolio();
  const [mode, setMode] = useState<PercentageType>("stable");

  const data = portfolio.map((holding) => ({
    name: holding.name,
    value: holding[mode],
  }));

  const biggestRatio = Math.max(...data.map((item) => item.value), 0);
  const bufferedMaxValue = Math.max(Math.ceil(biggestRatio * 1.1), 10);

  return (
    <section className="sticky top-3 flex h-[calc(100vh-1.5rem)] flex-1 flex-col rounded-xl border border-zinc-300 bg-white p-5">
      <div className="flex justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">포트폴리오 비율</h2>
          <p className="text-sm text-muted-foreground">
            자산군 별 {mode === "growth" ? "성장형" : "안정형"} 비율
          </p>
        </div>
        <Tabs
          defaultValue="growth"
          value={mode}
          onValueChange={(value) => setMode(value as "growth" | "stable")}
          className="mb-8"
        >
          <TabsList>
            <TabsTrigger value="stable">안정형</TabsTrigger>
            <TabsTrigger value="growth">성장형</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ChartContainer config={chartConfig} className="w-full flex-1">
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{ left: 0, right: 20, top: 0, bottom: 20 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            domain={[0, bufferedMaxValue]}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            dataKey="name"
            type="category"
            tickMargin={10}
            tickLine={false}
            axisLine={false}
            width={120}
            tickFormatter={(value) => {
              return value.length > 15 ? value.slice(0, 12) + "..." : value;
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent formatter={(value) => `${value}%`} />}
          />
          <Bar dataKey="value" radius={12} />
        </BarChart>
      </ChartContainer>
    </section>
  );
};
