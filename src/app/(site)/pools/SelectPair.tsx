'use client'

import { Button } from "@/components/ui/button"
import { allCoinsProps, newPoolProps } from "@/interfaces/interfaces"
import { Dispatch, SetStateAction, useState } from "react"
import { ChevronDown } from 'lucide-react';
import ModalAllCoins from "@/components/global/ModalAllCoins"

interface selectPairProps {
  newPool: newPoolProps,
  setNewPool: Dispatch<SetStateAction<newPoolProps>>
}

const SelectPair = ({ newPool, setNewPool }: selectPairProps) => {

  const [open, setOpen] = useState(false)
  const [select, setSelect] = useState('')

  const handleDialog = (id: string) => {
    setSelect(id)
    setOpen(prev => !prev)
  }

  const selectToken = (coin: allCoinsProps) => {
    if (select === 'first') {
      setNewPool({ ...newPool, imageFirst: coin.image, symbolFirst: coin.symbol.toUpperCase() })
      setOpen(prev => !prev)
    } else {
      setNewPool({ ...newPool, imageSecond: coin.image, symbolSecond: coin.symbol.toUpperCase() })
      setOpen(prev => !prev)
    }
  }

  return (
    <div>
      <div className="flex gap-2.5 w-full">
        <Button onClick={() => handleDialog('first')} className="w-1/2 cursor-pointer bg-accent-foreground">
          {!newPool.imageFirst &&
            <div className="flex justify-between p-1.5 w-full items-center">
              <a className="font-bold">Choose Token</a>
              <ChevronDown />
            </div>}
          {newPool.imageFirst &&
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start p-1.5 flex-1 items-center gap-1.5">
                <img src={newPool.imageFirst} alt="symbol" className="w-5 h-5 mt-1" />
                <a className="font-bold">{newPool.symbolFirst.toUpperCase()}</a>
              </div>
              <div className="w-1/12">
                <ChevronDown size={25} />
              </div>
            </div>}
        </Button>

        <Button onClick={() => handleDialog('second')} className="w-1/2 cursor-pointer bg-accent-foreground">
          {!newPool.imageSecond &&
            <div className="flex justify-between p-1.5 w-full items-center">
              <a className="font-bold">Choose Token</a>
              <ChevronDown />
            </div>}
          {newPool.imageSecond &&
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-start p-1.5 flex-1 items-center gap-1.5">
                <img src={newPool.imageSecond} alt="symbol" className="w-5 h-5 mt-1" />
                <a className="font-bold">{newPool.symbolSecond.toUpperCase()}</a>
              </div>
              <div className="w-1/12">
                <ChevronDown size={25} />
              </div>
            </div>}
        </Button>
      </div>
      <ModalAllCoins open={open} setOpen={setOpen} selectToken={selectToken} />
    </div>
  )
}

export default SelectPair