'use client'

import useCoreApi from "@/hooks/useCoreApi";
import useTraders from "@/hooks/useTraders";
import { useEffect, useState } from "react";
import HeaderTradings from "./HeaderTradings";
import { Separator } from "@/components/ui/separator";
import ChangeTrating from "./ChangeTrading";
import DeleteTrading from "./DeleteTrading";
import HeaderSearch from "./HeaderSearch";
import { tradersProfitProps } from "@/interfaces/interfaces";
import DetailsMobile from "./DetailsMobile";

const GridTradings = () => {

  const { data } = useCoreApi()
  const { traders } = useTraders()
  const [tradersProfit, setTradersProfit] = useState<tradersProfitProps[]>([])
  const [search, setSearch] = useState<Array<string>>([])

  useEffect(() => {
    if (!data || !traders) return
    let newTraders: Array<tradersProfitProps> = []

    for (let i = 0; i < traders.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (traders[i].name === data[j].name) {
          const cryptos = parseFloat(traders[i].value?.replace(/\$\s?|/g, '').replace(',', '.')) / parseFloat(traders[i].priceCoin?.replace(/\$\s?|/g, '').replace(',', '.'))
          const balance = cryptos * data[j].current_price
          const profitUsd = balance - parseFloat(traders[i].value?.replace(/\$\s?|/g, '').replace(',', '.'))
          const percent = (((balance * 100) / (parseFloat(traders[i].value?.replace(/\$\s?|/g, '').replace(',', '.')))) - 100).toFixed(2)
          newTraders.push({ ...traders[i], profit: profitUsd, percent: percent, cryptos: cryptos })
          break
        }
      }
    }
    setTradersProfit(newTraders)
  }, [traders])

  const orderByDataTrader = [...tradersProfit].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const searchCoins = orderByDataTrader?.filter(coin => search.length != 0 ? search.includes(coin.name) : coin.name)

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="w-full">
        <HeaderSearch search={search} setSearch={setSearch} />
      </div>
      <div className="flex flex-col px-4 gap-1 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
        <HeaderTradings />
        <Separator />
        {searchCoins.map((item, index) => (
          <div key={index} className="grid grid-cols-7 md:grid-cols-18 gap-4 font-semibold h-16">
            <div className="flex col-span-3 md:col-span-6 lg:col-span-4 justify-start items-center gap-3">
              <img src={item.image} alt="symbol" className="w-10 h-10 rounded-full" />
              <p className="hidden md:flex">{item.name}</p>
              <p className="uppercase">{item.symbol}</p>
            </div>
            <div className={`col-span-2 md:col-span-2 flex justify-center items-center ${item.status === 'buy' ? 'text-chart-4' : 'text-red-600'}`}>
              <p className="uppercase">{item.status}</p>
            </div>
            <div className="hidden md:col-span-2 md:flex justify-center items-center">
              <p>{item.priceCoin}</p>
            </div>
            <div className="md:col-span-2 flex justify-center items-center">
              <p>{item.value}</p>
            </div>
            <div className="hidden md:col-span-2 md:flex justify-center items-center">
              <p>{item.cryptos?.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 6 })}</p>
            </div>
            <div className={`hidden lg:flex lg:col-span-3 justify-center items-center ${item.profit >= 0 ? 'text-chart-4' : 'text-red-600'}`}>
              {item.status === 'buy' &&
                <p>{`${item.profit?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (${item.percent}%)`}</p>}
            </div>
            <div className="hidden md:col-span-3 lg:col-span-2 md:flex justify-center items-center">
              <p>{item.date?.split('-').reverse().join('/')}</p>
            </div>
            <div className="hidden lg:flex justify-end items-center gap-1">
              <ChangeTrating id={item.id} status={item.status} oldValue={item.value} />
              <DeleteTrading id={item.id} status={item.status} value={item.value} />
            </div>
            <div className="flex lg:hidden justify-end items-center">
              <DetailsMobile item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridTradings;