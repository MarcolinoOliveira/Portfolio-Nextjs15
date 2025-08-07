"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import useWallet from "@/hooks/useWallet"
import { useMediaQuery } from "use-media-query-react"

export function ChartBarSales() {

  const { assetData } = useWallet()
  const isLg = useMediaQuery('(min-width: 1024px)')

  const orderAssetData = [...assetData].sort((a, b) => (b.historicalApplied) - (a.historicalApplied))

  const chartConfig = {
    historicalApplied: {
      label: "Applied",
      color: "var(--chart-1)",
    },
    valueSell: {
      label: "Sales",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig

  const totalApplied = orderAssetData.reduce((acc, curr) => acc + curr.historicalApplied, 0)
  const totalSales = orderAssetData.reduce((acc, curr) => acc + curr.valueSell, 0)

  return (
    <div className="flex flex-col w-full h-150 lg:h-96">
      <div className="flex w-full justify-between py-3 font-semibold text-sm">
        <div>
          <p>Historical Data</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex gap-1">
            <span className="inline-block w-4 h-4 rounded-full mt-0.5 bg-chart-1" />
            <p>Applied:</p>
            <p>{totalApplied?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </div>
          <div className="flex gap-1">
            <span className="inline-block w-4 h-4 rounded-full mt-0.5 bg-chart-3" />
            <p>Sales:</p>
            <p>{totalSales?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig}>
          <BarChart
            layout={isLg ? 'horizontal' : 'vertical'}
            data={orderAssetData}
            barSize={15}
            barGap={2}
          >
            {!isLg &&
              <>
                <XAxis type="number" />
                <YAxis
                  dataKey="symbol"
                  type="category"
                  tick={({ x, y, payload }) => (
                    <text
                      x={x}
                      y={y}
                      dx={-8}
                      textAnchor="middle"
                      fill="currentColor"
                      fontWeight="bold"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {String(payload.value).toUpperCase()}
                    </text>
                  )}
                />
              </>
            }
            {isLg &&
              <>
                <XAxis
                  dataKey="symbol"
                  type="category"
                  tick={({ x, y, payload }) => (
                    <text
                      x={x}
                      y={y}
                      dy={8}
                      textAnchor="middle"
                      fill="currentColor"
                      fontWeight="bold"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {String(payload.value).toUpperCase()}
                    </text>
                  )}
                />
                <YAxis type="number" />
              </>
            }
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="historicalApplied" fill="var(--chart-1)" radius={isLg ? [6, 6, 0, 0] : [0, 6, 6, 0]}></Bar>
            <Bar dataKey="valueSell" fill="var(--chart-3)" radius={isLg ? [6, 6, 0, 0] : [0, 6, 6, 0]}></Bar>
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  )
}