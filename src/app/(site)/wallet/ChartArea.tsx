"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { assetDataProps } from "@/interfaces/interfaces"

interface ChartAreaProps {
  asset: assetDataProps
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-13)",
  },
} satisfies ChartConfig

const ChartArea = ({ asset }: ChartAreaProps) => {

  const chartData = [
    { asset: "", desktop: 0, mobile: 0 },
    { asset: "", desktop: asset.contribution / 2, mobile: asset.contribution },
    { asset: "", desktop: 80, mobile: 50 },
    { asset: "", desktop: asset.contribution, mobile: asset.balance },
  ]

  return (
    <div className="w-full h-24">
      <ResponsiveContainer width='100%' height='100%'>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
          >
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="asset"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <ChartTooltip cursor={false} content={<ChartTooltipContent />} /> */}
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              //stackId="a"
              dot={false}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              //stackId="a"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartArea