'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useCoreApi from "@/hooks/useCoreApi"
import { allCoinsProps } from "@/interfaces/interfaces"
import { Dispatch, SetStateAction, useState } from "react"
import { FixedSizeList } from "react-window";

interface rowListCryptosProps {
  index: number
  style: React.CSSProperties
}

interface ModalAllCoinsProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  selectToken: (coin: allCoinsProps) => void
}

const ModalAllCoins = ({ open, setOpen, selectToken }: ModalAllCoinsProps) => {

  const [search, setSearch] = useState('')

  const { data } = useCoreApi()

  const searchCoins = data?.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const rowListCrytos = ({ index, style }: rowListCryptosProps) => {

    if (searchCoins) {
      const coin = searchCoins[index]

      return (
        <div
          key={coin.id}
          style={style}
          className="flex cursor-pointer hover:bg-accent-foreground items-center rounded-2xl px-1 justify-between"
          onClick={() => selectToken(coin)}
        >
          <div className="flex gap-2 w-full" >
            <img src={coin.image} alt="symbol" className="w-10 h-10" />
            <div className="flex flex-col font-semibold">
              <p>{coin.name}</p>
              <p className="uppercase text-gray-400 text-[12px] font-semibold">{coin.symbol}</p>
            </div>
          </div>
          <div className="flex justify-end font-semibold pr-1.5">
            <p>{coin.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </div>
        </div>
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex gap-5 w-full">
          <DialogTitle className="">Select a Token</DialogTitle>
          <Input id="name" type="name" onChange={(e) => setSearch(e.target.value)} placeholder="Search tokens" />
        </DialogHeader>
        {searchCoins &&
          <FixedSizeList height={400} width='100%' itemCount={searchCoins.length} itemSize={60} className="custom-scrollbar">
            {rowListCrytos}
          </FixedSizeList>
        }
      </DialogContent>
    </Dialog>
  )
}

export default ModalAllCoins