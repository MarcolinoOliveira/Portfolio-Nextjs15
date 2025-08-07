'use client'

import { addLiquidity } from "@/app/firebase/updateDocs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useSavedMoney from "@/hooks/useSavedMoney";
import MaskedCurrencyInput from "@/lib/MaskCurrencyInput";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddLiquidityProps {
  id: string
  email: string
  startValue: string
}

const AddLiquidity = ({ id, email, startValue }: AddLiquidityProps) => {

  const { savedMoney } = useSavedMoney()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newLiquidity, setNewLiquidity] = useState('')

  const handleLiquidity = () => {
    setLoading(prev => !prev)

    if (!newLiquidity) {
      toast.error('Invalide Assets', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    addLiquidity({ newLiquidity, startValue, email, id, savedMoney })
    setLoading(prev => !prev)
    setOpen(prev => !prev)
    toast.success('liquidity added successfully', { richColors: true })
    setNewLiquidity('')
  }

  return (
    <div>
      <div onClick={() => setOpen(prev => !prev)} className="cursor-pointer -ml-[10px] text-primary px-2 py-1 hover:bg-accent-foreground rounded-[5px]">
        <a>+ Add Liquidity</a>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex justify-center items-center py-2 font-bold">
            <DialogTitle>Add Liquidity</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-start justify-center w-full">
            <Label>Increased Value:</Label>
            <MaskedCurrencyInput value={newLiquidity} onChange={(e) => setNewLiquidity(e)} />
          </div>
          <DialogFooter>
            <Button onClick={handleLiquidity} className="w-full mt-2 cursor-pointer">
              {loading === true && <a>Increase</a>}
              {loading === false && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddLiquidity;