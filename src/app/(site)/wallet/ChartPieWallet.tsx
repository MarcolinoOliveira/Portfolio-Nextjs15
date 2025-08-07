"use client"

import { Layer, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import useWallet from "@/hooks/useWallet";
import { useEffect, useState } from "react";

interface assetDataConfigProps {
  name: string
  balance: number
  fill: string
}

export default function ChartPieWallet() {

  const { assetData } = useWallet()
  const [assetDataConfig, setAssetDataConfig] = useState<assetDataConfigProps[]>([])

  useEffect(() => {
    if (!assetData) return

    let assetsConfig: Array<assetDataConfigProps> = []
    for (let i = 0; i < assetData.length; i++) {
      assetsConfig.push({ name: assetData[i]?.name, balance: assetData[i]?.balance, fill: `var(--color-${assetData[i]?.name.toLowerCase()})` })
    }
    setAssetDataConfig(assetsConfig)
  }, [assetData])

  const orderAssets = [...assetData].sort((a, b) => (b.balance) - (a.balance))
  const orderAssetsConfig = [...assetDataConfig].sort((a, b) => (b.balance) - (a.balance))

  const chartConfig = orderAssets.reduce((acc, coin, index) => {
    const key = coin.name.toLowerCase();

    acc[key] = {
      label: coin.name as any,
      color: `var(--chart-${index + 1})` as any,
    } satisfies ChartConfig
    return acc;
  }, {} as Record<string, { label: any; color: any }>);

  const totalBalance = assetData?.reduce((acc, curr) => acc + curr.balance, 0)
  const totalCurrencys = assetData?.reduce((acc, curr) => acc + 1, 0)

  return (
    <div className="flex flex-col md:flex-row w-full lg:flex-1 px-3 justify-between">
      <div className="relative h-62 w-68 px-2 mx-auto md:mx-0">
        <h1 className="hidden md:flex font-semibold ml-8">Balance details</h1>
        <ResponsiveContainer width='100%' height='100%'>
          <ChartContainer config={chartConfig}>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={orderAssetsConfig}
                dataKey="balance"
                nameKey="name"
                innerRadius={85}
                strokeWidth={5}
                cornerRadius={15}
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
              {totalBalance?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-[250px] px-4 mt-2 lg:mt-0">
        <h3 className="flex justify-end w-full font-semibold text-sm mb-6 text-text-gray">{totalCurrencys} Currencies</h3>
        <div className="h-55 overflow-y-auto custom-scrollbar">
          <ul className="space-y-5">
            {orderAssets.map((coin, index) => (
              <li key={index} className="flex items-center gap-6 text-sm justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className="inline-block w-5 h-5 rounded-full"
                    style={{ backgroundColor: `var(--chart-${index + 1})` }}
                  />
                  <div className="flex flex-col gap-0.5">
                    <a className="font-semibold">{coin.symbol.toUpperCase()}</a>
                    <a className="font-semibold text-text-gray text-[12px]">{coin.name}</a>
                  </div>
                </div>
                <a className="flex flex-1 justify-end items-center font-semibold mr-2 mb-2">
                  {((coin.balance / totalBalance) * 100).toFixed(2)}%
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}