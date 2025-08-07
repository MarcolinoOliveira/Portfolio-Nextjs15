'use client'

import useWallet from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BalanceWallet = () => {

  const { assetData, loading } = useWallet()
  const [currentContribution, setCurrentContribution] = useState(0)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [currentProfit, setCurrentProfit] = useState(0)
  const [currentPercent, setCurrentPercent] = useState(0)

  useEffect(() => {
    if (!assetData) return

    const balance = assetData.reduce((acc, curr) => acc + curr.balance, 0)
    const contribution = assetData.reduce((acc, curr) => acc + curr.contribution, 0)
    const profit = balance - contribution
    const percent = (((balance * 100) / contribution) - 100)

    setCurrentBalance(balance)
    setCurrentContribution(contribution)
    setCurrentProfit(profit)
    setCurrentPercent(percent)

  }, [assetData])

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col w-full lg:w-2/5 items-center pt-1.5 lg:pr-8 font-semibold">
      <div className="flex items-center w-full justify-between">
        <a>Balance</a>
        <a className={`flex flex-1 justify-end items-center ${currentPercent >= 0 ? 'text-chart-4' : 'text-red-500'}`}>
          {currentPercent >= 0 ?
            <TrendingUp width={18} height={18} className="mr-1 mt-1" /> :
            <TrendingDown width={18} height={18} className="mr-1 mt-1" />}
          {(currentPercent.toFixed(2))}%
        </a>
      </div>
      <div className="flex py-8 items-center justify-start w-full">
        <a className="text-3xl">{currentBalance?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
      </div>
      <div className="flex justify-between items-end w-full lg:mt-20">
        <div className="flex flex-col items-center justify-start gap-1">
          <a>Contribution</a>
          <a>{currentContribution?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
        </div>
        <Separator orientation="vertical" className="bg-border" />
        <div className="flex flex-col items-center justify-start gap-1">
          <a>Total profit</a>
          <a className={`${currentProfit > 0 ? 'text-chart-4' : 'text-red-500'} flex items-center`}>
            {currentProfit >= 0 ?
              <TrendingUp width={18} height={18} className="mr-1" /> :
              <TrendingDown width={18} height={18} className="mr-1" />}
            {currentProfit?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD
          </a>
        </div>
      </div>
    </div>
  );
}

export default BalanceWallet;