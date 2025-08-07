'use client'

import { Layer, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import useBalanceTotal from "@/hooks/useBalanceTotal";
import { useMediaQuery } from "use-media-query-react";
import { usePathname } from "next/navigation";

export default function ChartPiePortfolio() {

  const { balanceTotalData, loading } = useBalanceTotal()
  const isXl = useMediaQuery('(min-width: 1280px)')
  const pathName = usePathname()

  const chartData = [
    { name: 'Purchased assets', balance: balanceTotalData.totalBalanceAssets, fill: 'var(--color-purchased)' },
    { name: 'Liquidity pools', balance: balanceTotalData.totalAllPools, fill: 'var(--color-liquidity)' },
    { name: 'USD Cash', balance: balanceTotalData.totalUsd, fill: 'var(--color-usd)' },
    { name: 'BRL Cash', balance: balanceTotalData.totalBrlUsd, fill: 'var(--color-brl)' },
    { name: 'Borrowed', balance: balanceTotalData.borrow, fill: 'var(--color-borrowed)' },
  ]

  const orderChartData = chartData.sort((a, b) => (b.balance) - (a.balance))

  const chartConfig = orderChartData.reduce((acc, coin, index) => {
    const key = coin.name.split(" ")[0].toLowerCase();

    acc[key] = {
      label: key as any,
      color: `var(--chart-${index + 1})` as any,
    } satisfies ChartConfig
    return acc;
  }, {} as Record<string, { label: any; color: any }>);

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col md:flex-row w-full lg:px-3 justify-between">
      <div className="relative h-70 w-83 lg:px-2 mx-auto md:mx-0 flex-1">
        <h1 className="hidden md:flex font-semibold ml-8">Balance details</h1>
        <ResponsiveContainer width='100%' height='100%'>
          <ChartContainer config={chartConfig}>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={orderChartData}
                dataKey="balance"
                nameKey="name"
                label={({ name, balance }) => `${pathName === '/dashboard' ? isXl ? name : '' : ''}
                                          ${((balance / balanceTotalData.balanceTotal) * 100).toFixed(2)}%`}
                innerRadius={85}
                strokeWidth={3}
                cornerRadius={10}
                paddingAngle={1}
              />
              <Layer>
                <circle
                  cx="50%"
                  cy="50%"
                  r="80"
                  fill="none"
                  stroke="#8884d8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </Layer>
            </PieChart>
          </ChartContainer>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:mt-7">
          <div className="text-center">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-xl font-bold">
              {balanceTotalData.balanceTotal?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-2/5 px-4 mt-2 lg:mt-0 justify-end">
        <h3 className="flex justify-end w-full font-semibold text-sm mb-6 mr-4 text-text-gray">Portfolio</h3>
        <div className="h-60 overflow-y-auto custom-scrollbar">
          <ul className="space-y-7">
            {orderChartData.map((coin, index) => (
              <li key={index} className="flex items-center gap-6 text-sm justify-between font-semibold">
                <div className="flex items-center gap-4 w-40">
                  <span
                    className="inline-block w-5 h-5 rounded-full mt-0.5"
                    style={{ backgroundColor: `var(--chart-${index + 1})` }}
                  />
                  <a>{coin.name}</a>
                </div>
                <div className="flex w-15 justify-end items-center">
                  <a>
                    {((coin.balance / balanceTotalData.balanceTotal) * 100).toFixed(2)}%
                  </a>
                </div>
                {pathName === '/dashboard' &&
                  <div className="flex w-20 justify-end items-center">
                    <a>{coin.balance?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</a>
                  </div>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}