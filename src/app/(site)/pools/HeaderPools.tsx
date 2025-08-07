'use client'

import usePools from "@/hooks/usePools"
import { useEffect, useState } from "react"
import AddNewPool from "./AddNewPool"
import { getDaysActive } from "@/lib/formatDate"

const HeaderPools = () => {

  const { allPools, loading } = usePools()

  const [currentAssets, setCurrentAssets] = useState(0)
  const [currentFees, setCurrentFees] = useState(0)
  const [currentProfit, setCurrentProfit] = useState(0)
  const [totalFees, setTotalFees] = useState(0)
  const [totalPnL, setTotalPnL] = useState(0)

  useEffect(() => {
    if (!allPools) return

    let balance = 0
    let fees = 0
    let totalFees = 0
    let PnL = 0
    let days = 0

    for (let i = 0; i < allPools?.length; i++) {
      if (allPools[i].status === 'Active') {
        balance += parseFloat(allPools[i].startValue.replace(/\$\s?|/g, '').replace(',', '.'))
        fees += parseFloat(allPools[i].fees.replace(/\$\s?|/g, '').replace(',', '.'))
      } else {
        PnL += (parseFloat(allPools[i].endValue.replace(/\$\s?|/g, '').replace(',', '.')) -
          parseFloat(allPools[i].startValue.replace(/\$\s?|/g, '').replace(',', '.')))
      }
      totalFees += parseFloat(allPools[i].fees.replace(/\$\s?|/g, '').replace(',', '.'))
    }

    for (let i = 0; i < allPools?.length; i++) {
      if (getDaysActive(allPools[i]?.startDate) > days) {
        days = getDaysActive(allPools[i]?.startDate)
      }
    }

    if (fees) {
      const currentProfit = (fees / balance) * 100
      setCurrentProfit(currentProfit)
    } else {
      setCurrentProfit(0)
    }

    const totalPnl = totalFees + PnL

    setCurrentAssets(balance)
    setCurrentFees(fees)
    setTotalFees(totalFees)
    setTotalPnL(totalPnl)

  }, [allPools])

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col lg:flex-row w-full gap-2 h-auto p-6 rounded-2xl bg-gradient-to-br from-sidebar via-muted to-accent
                    inset-shadow-sm inset-shadow-border">

      <div className="flex w-full gap-3.5 items-center">
        <div className="flex flex-col w-1/2 lg:gap-1 items-start justify-start">
          <a className="text-text-gray font-semibold">Current Assets</a>
          <a className="font-bold text-[18px]">
            {currentAssets?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </a>
        </div>
        <div className="flex flex-col w-1/2 lg:gap-1 items-start justify-start">
          <a className="text-text-gray font-semibold">Current Fees</a>
          <a className="font-bold text-[18px]">
            {currentFees?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </a>
        </div>
      </div>

      <div className="flex gap-3.5 lg:gap-0 w-full items-center">
        <div className="flex flex-col w-1/2 lg:gap-1 items-start justify-start">
          <a className="text-text-gray font-semibold">Yield</a>
          <a className={`${currentProfit >= 0 ? 'text-chart-4' : 'text-red-500'} font-bold text-[18px]`}>
            %{currentProfit.toFixed(2)}
          </a>
        </div>
        <div className="flex flex-col w-1/2 lg:gap-1 items-start justify-start">
          <a className="text-text-gray font-semibold">Total Fees</a>
          <a className="font-bold text-[18px]">
            {totalFees?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </a>
        </div>
      </div>
      <div className="flex flex-col lg:gap-1 lg:w-[400px] items-start justify-start">
        <a className="text-text-gray font-semibold">Total PnL</a>
        <a className={`${totalPnL >= 0 ? 'text-chart-4' : 'text-red-500'} font-bold text-[18px]`}>
          {totalPnL?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </a>
      </div>
      <div className="flex lg:justify-end items-center w-full mt-2 lg:mt-0">
        <AddNewPool />
      </div>
    </div>
  );
}

export default HeaderPools;