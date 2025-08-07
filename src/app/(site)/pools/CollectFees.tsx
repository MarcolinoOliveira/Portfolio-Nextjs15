'use client'

import { updateFees } from "@/app/firebase/updateDocs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useSavedMoney from "@/hooks/useSavedMoney";
import MaskedCurrencyInput from "@/lib/MaskCurrencyInput";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CollectFeesProps {
  id: string
  email: string
  fees: string
}

const CollectFees = ({ id, email, fees }: CollectFeesProps) => {

  const { savedMoney } = useSavedMoney()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newFees, setNewFees] = useState('')

  const handleFees = () => {
    setLoading(prev => !prev)

    if (!newFees) {
      toast.error('Invalide Assets', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    updateFees({ email, id, fees, newFees, savedMoney })
    setLoading(prev => !prev)
    setOpen(prev => !prev)
    toast.success('Fees collected successfully', { richColors: true })
    setNewFees('')
  }

  return (
    <div>
      <div onClick={() => setOpen(prev => !prev)} className="cursor-pointer -ml-[10px] text-primary px-2 py-1 hover:bg-accent-foreground rounded-[5px]">
        <a>+ Collect fees</a>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex justify-center items-center py-2 font-bold">
            <DialogTitle>Fees</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-start justify-center w-full">
            <Label>Amount Collected:</Label>
            <MaskedCurrencyInput value={newFees} onChange={(e) => setNewFees(e)} />
          </div>
          <DialogFooter>
            <Button onClick={handleFees} className="w-full mt-2 cursor-pointer">
              {loading === true && <a>Collect</a>}
              {loading === false && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CollectFees;