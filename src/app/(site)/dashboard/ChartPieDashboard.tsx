"use client"

import { Layer, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import useWallet from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface assetDataConfigProps {
  name: string
  balance: number
  fill: string
}

export default function ChartPieDashboard() {

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

  const chartConfig = orderAssets?.reduce((acc, coin, index) => {
    const key = coin.name.toLowerCase();

    acc[key] = {
      label: coin.name as any,
      color: `var(--chart-${index + 1})` as any,
    } satisfies ChartConfig
    return acc;
  }, {} as Record<string, { label: any; color: any }>);

  const totalContributed = assetData?.reduce((acc, curr) => acc + curr.contribution, 0)
  const totalBalance = assetData?.reduce((acc, curr) => acc + curr.balance, 0)
  const totalCurrencys = assetData?.reduce((acc, curr) => acc + 1, 0)
  const percent = (((totalBalance * 100) / totalContributed) - 100)

  return (
    <div className="flex flex-col md:flex-row w-full lg:flex-1 px-3 justify-between">
      <div className="relative h-45 w-48 px-2 mx-auto lg:ml-5">
        <h1 className="hidden md:flex font-semibold">Wallet: {totalBalance?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
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
                innerRadius={55}
                strokeWidth={5}
                cornerRadius={15}
                paddingAngle={1}
              />
              <Layer>
                <circle
                  cx="50%"
                  cy="50%"
                  r="50"
                  fill="none"
                  stroke="#8884d8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </Layer>
            </PieChart>
          </ChartContainer>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:mt-10">
          <div className="text-center">
            <div className={`flex gap-0.5 text-sm font-bold ${percent >= 0 ? 'text-chart-4' : 'text-red-600'}`}>
              {percent >= 0 && <TrendingUp />}
              {percent <= 0 && <TrendingDown />}
              {percent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-[250px] mt-2 lg:mt-0 lg:mr-6">
        <h3 className="flex justify-end w-full font-semibold text-sm mb-6 text-text-gray">{totalCurrencys} Currencies</h3>
        <div className="h-33 overflow-y-auto custom-scrollbar">
          <ul className="space-y-7">
            {orderAssets.map((coin, index) => (
              <li key={index} className="flex items-center gap-3 text-sm justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className="inline-block w-5 h-5 rounded-full mt-0.5"
                    style={{ backgroundColor: `var(--chart-${index + 1})` }}
                  />
                  <div className="flex w-31 gap-0.5 justify-between">
                    <a className="font-semibold">{coin.name}</a>
                    <a className="font-semibold text-text-gray">{coin.symbol.toUpperCase()}</a>
                  </div>
                </div>
                <a className="flex justify-end items-center font-semibold mr-2">
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