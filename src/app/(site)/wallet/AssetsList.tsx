'use client'

import { useState } from "react";
import AssetDetails from "./AssetDetails";
import ChartArea from "./ChartArea";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useMediaQuery } from 'use-media-query-react'
import { TrendingDown, TrendingUp } from "lucide-react"
import useWallet from "@/hooks/useWallet";
import { Separator } from "@/components/ui/separator";
import BalanceWallet from "./BalanceWallet";
import ChartPieWallet from "./ChartPieWallet";

const AssetsList = () => {

  const [assetName, setAssetName] = useState<string>('')

  const { assetData } = useWallet()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isLg = useMediaQuery('(max-width: 1024px)')

  const orderBalanceAsset = [...assetData].sort((a, b) => b.balance - a.balance)

  const clearNameAsset = () => {
    setAssetName('')
  }

  if (!assetData[0]) return <div>Loading...</div>

  return (
    <div className="flex flex-col w-full gap-4">
      <Carousel
        className="w-full"
        opts={{
          align: isMobile ? 'center' : 'start',
        }}>
        <CarouselContent>
          {orderBalanceAsset?.map((coin, i) => (
            <CarouselItem key={i} className="basis-7/8 md:basis-1/2 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
              <div className={`flex flex-col pt-6 px-6 bg-gradient-to-b from-gradient-1 via-muted to-accent 
                ${coin.name === assetName ? "inset-shadow-chart-3" : "inset-shadow-border"}
                rounded-2xl cursor-pointer inset-shadow-sm  hover:inset-shadow-chart-3 transition-shadow
                `}
                onClick={() => setAssetName(coin.name)}>
                <div className="flex w-full gap-3 items-center">
                  <img src={coin.image} alt="symbol" className="h-7 w-7" />
                  <p className="uppercase font-semibold">{coin.symbol}</p>
                  <p className={`flex flex-1 justify-end items-center font-semibold ${coin.percent >= 0 ? 'text-chart-4' : 'text-red-500'}`}>
                    {coin.percent >= 0 ?
                      <TrendingUp width={18} height={18} className="mr-1" /> :
                      <TrendingDown width={18} height={18} className="mr-1" />}
                    {(coin.percent.toFixed(2))}%
                  </p>
                </div>
                <div className="flex flex-col w-full gap-1 items-start mt-1.5 cursor-pointer">
                  <p className="flex font-bold text-[20px]">{coin.cryptos?.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 6 })}</p>
                  <p className="flex text-text-gray font-semibold">{coin.balance?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</p>
                  <ChartArea asset={coin} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={`
            ml-8 
            cursor-pointer
            hover:bg-sidebar
            hover:text-primary
            ${assetData.length < 2 && 'hidden'}
            md:${assetData.length < 3 && 'hidden'}
            lg:${assetData.length < 5 && 'hidden'}
            xl:${assetData.length < 6 && 'hidden'}
            2xl:${assetData.length < 8 && 'hidden'}
            `}
        />
        <CarouselNext className={`
          mr-8 
          cursor-pointer
          hover:bg-sidebar
          hover:text-primary
           ${assetData.length < 2 && 'hidden'}
            md:${assetData.length < 3 && 'hidden'}
            lg:${assetData.length < 5 && 'hidden'}
            xl:${assetData.length < 6 && 'hidden'}
            2xl:${assetData.length < 8 && 'hidden'}
          `}
        />
      </Carousel>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex p-6 w-full lg:w-1/4 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
          {!assetName && <div className="flex items-center justify-center w-full font-bold">Asset details</div>}
          {assetName && <AssetDetails name={assetName} clear={clearNameAsset} />}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between p-6 w-full lg:w-3/4 bg-gradient-to-b from-gradient-1 via-muted to-accent inset-shadow-sm inset-shadow-border rounded-2xl">
          <BalanceWallet />
          <Separator className="bg-border mt-2 lg:mt-0" orientation={`${isLg ? 'horizontal' : 'vertical'}`} />
          <ChartPieWallet />
        </div>
      </div>
    </div>
  );
}

export default AssetsList;