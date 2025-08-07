'use client'

import { allCoinsProps, tradeProps } from "@/interfaces/interfaces";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectAsset from "./SelectAsset";
import MaskedCurrencyInput from "@/lib/MaskCurrencyInput";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { addNewAsset } from "@/app/firebase/addDocs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import useSavedMoney from "@/hooks/useSavedMoney";

const AddNewAsset = () => {

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { savedMoney } = useSavedMoney()

  const [user] = useAuthState(auth)
  const email = user?.email

  const [selectedAsset, setSelectedAsset] = useState<allCoinsProps>({
    id: '',
    symbol: '',
    name: '',
    image: '',
    current_price: 0
  })

  const [trade, setTrade] = useState<tradeProps>({
    id: '',
    name: '',
    status: '',
    priceCoin: '',
    value: '',
    date: '',
    symbol: '',
    image: '',
  })

  const handleAddNewPool = async () => {
    if (!email) return
    setLoading(prev => !prev)

    if (!selectedAsset.image || !trade.priceCoin || !trade.value || !trade.date) {
      toast.error('Invalid assets', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    try {
      await addNewAsset({ selectedAsset, trade, email, setOpen, setLoading, savedMoney })
      setTrade({
        id: '',
        name: '',
        status: '',
        priceCoin: '',
        value: '',
        date: '',
        symbol: '',
        image: '',
      })
      setSelectedAsset({
        id: '',
        symbol: '',
        name: '',
        image: '',
        current_price: 0
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(prev => !prev)} className="cursor-pointer">
        <a>Add new asset</a>
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex justify-center items-center py-2 font-bold">
            <DialogTitle>Add new asset</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-start justify-center w-full">
            <Label>Select asset:</Label>
            <div className="w-full">
              <SelectAsset selectAsset={selectedAsset} setSelectAsset={setSelectedAsset} />
            </div>
            <Label>Currency price:</Label>
            <MaskedCurrencyInput value={trade.priceCoin} onChange={(e) => setTrade({ ...trade, priceCoin: e })} />
            <Label>Applied value:</Label>
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
            <Button onClick={handleAddNewPool} className="w-full mt-2 cursor-pointer">
              {!loading && <a>Add new asset</a>}
              {loading && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewAsset;