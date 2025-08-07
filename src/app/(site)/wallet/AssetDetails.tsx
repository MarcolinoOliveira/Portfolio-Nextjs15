'use client'

import { assetDataProps } from "@/interfaces/interfaces";
import Purchase from "./Purchase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Sale from "./Sale";
import useWallet from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import DeleteAsset from "./DeleteAsset";

interface AssetDetailsProps {
  name: string
  clear: () => void
}

const AssetDetails = ({ name, clear }: AssetDetailsProps) => {

  const { assetData } = useWallet()
  const [user] = useAuthState(auth)

  const [onlyAsset, setOnlyAsset] = useState<assetDataProps>({
    id: '',
    name: '',
    symbol: '',
    image: 'a',
    contribution: 0,
    cryptos: 0,
    balance: 0,
    profit: 0,
    percent: 0,
    avaregePrice: 0,
    valueSell: 0
  })

  useEffect(() => {
    if (!assetData) return

    for (let i = 0; i < assetData?.length; i++) {
      if (assetData[i].name === name) {
        setOnlyAsset(assetData[i])
        break
      }
    }
  }, [name, assetData])

  const email = user?.email

  return (
    <div className="flex flex-col font-semibold w-full justify-between gap-4 lg:gap-0">
      <div className="flex w-full gap-3 items-center">
        <img src={onlyAsset.image} alt="symbol" className="h-7 w-7" />
        <a className="uppercase">{onlyAsset?.symbol}</a>
        {email && <div className="flex flex-1 justify-end">
          <DeleteAsset id={onlyAsset.id} name={name} email={email} clear={clear} />
        </div>}
      </div>
      <div className="flex flex-col w-full gap-1 items-center mt-1.5">
        <div className="flex w-full justify-between">
          <a>Cryptos</a>
          <a>{onlyAsset.cryptos?.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 6 })}</a>
        </div>
        <div className="flex w-full justify-between">
          <a>Balance</a>
          <a>{onlyAsset.balance?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
        </div>
      </div>
      <Separator className="bg-ring" />
      <div className="flex flex-col w-full gap-1">
        <div className="flex w-full justify-between">
          <a>Contribution</a>
          <a>{onlyAsset.contribution?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
        </div>
        <div className="flex w-full justify-between">
          <a>Avarege price</a>
          <a>{onlyAsset.avaregePrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
        </div>
      </div>
      <Separator className="bg-ring" />
      <div className="flex flex-col w-full gap-1">
        <div className="flex w-full justify-between">
          <a>Profit</a>
          <a className={`${onlyAsset.profit > 0 ? 'text-chart-4' : 'text-red-500'} flex items-center`}>
            {onlyAsset.profit?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD
          </a>
        </div>
        <div className="flex w-full justify-between">
          <a>Total Sales</a>
          <a>{onlyAsset.valueSell?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
        </div>
      </div>
      {email &&
        <div className="flex gap-2 w-full">
          <Purchase asset={onlyAsset} email={email} />
          <Sale asset={onlyAsset} email={email} />
        </div>
      }
    </div>
  );
}

export default AssetDetails;