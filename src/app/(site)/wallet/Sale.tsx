'use client'

import { addNewTrade } from "@/app/firebase/addDocs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSavedMoney from "@/hooks/useSavedMoney";
import { assetDataProps, tradeProps } from "@/interfaces/interfaces";
import MaskedCurrencyInput from "@/lib/MaskCurrencyInput";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SaleProps {
  email: string
  asset: assetDataProps
}

const Sale = ({ email, asset }: SaleProps) => {

  const { savedMoney } = useSavedMoney()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [trade, setTrade] = useState<tradeProps>({
    id: '',
    name: '',
    status: 'sell',
    priceCoin: '',
    value: '',
    date: '',
    symbol: '',
    image: '',
  })

  const handleSale = async () => {
    setLoading(prev => !prev)

    if (!trade.priceCoin || !trade.date || !trade.value) {
      toast.error("Invalid assets", { richColors: true })
      setLoading(prev => !prev)
      return
    }

    const priceCoin = parseFloat(trade.priceCoin.replace(/\$\s?|/g, '').replace(',', '.'))
    const value = parseFloat(trade.value.replace(/\$\s?|/g, '').replace(',', '.'))
    const cryptos = ((asset.cryptos) - (value / priceCoin))

    if (cryptos < 0) {
      toast.error('insufficient coins for sale', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    try {
      await addNewTrade({ asset, email, trade, setLoading, setOpen, savedMoney })
      toast.success('Trade added successfully', { richColors: true })
      setTrade({ id: '', name: '', status: 'sell', priceCoin: '', value: '', date: '', symbol: '', image: '', })
    } catch (e) {
      console.log(e)
    }
  }

  const handleOpen = () => {
    setTrade({ ...trade, id: asset.id, name: asset.name })
    setOpen(prev => !prev)
  }

  return (
    <div className="w-1/2">
      <Button onClick={() => handleOpen()} variant='outline' className="cursor-pointer w-full rounded-[5px]">
        <a>Withdraw</a>
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex justify-center items-center py-2 font-bold">
            <DialogTitle>New sale</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-start justify-center w-full">
            <Label>Selling price:</Label>
            <MaskedCurrencyInput value={trade.priceCoin} onChange={(e) => setTrade({ ...trade, priceCoin: e })} />
            <Label>Sold value:</Label>
            <MaskedCurrencyInput value={trade.value} onChange={(e) => setTrade({ ...trade, value: e })} />
            <Label>Date:</Label>
            <Input
              id="date"
              placeholder="00/00/0000"
              type="Date"
              onChange={(e) => setTrade({ ...trade, date: e.target.value })}
              required
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSale} className="w-full mt-2 cursor-pointer">
              {loading === true && <a>Sale</a>}
              {loading === false && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Sale;