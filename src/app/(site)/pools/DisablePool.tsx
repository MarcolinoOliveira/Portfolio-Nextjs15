'use client'

import { disablePool } from "@/app/firebase/deleteDocs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSavedMoney from "@/hooks/useSavedMoney";
import { endingPoolPros } from "@/interfaces/interfaces";
import MaskedCurrencyInput from "@/lib/MaskCurrencyInput";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DisablePoolProps {
  id: string
  email: string
}

const DisablePool = ({ id, email }: DisablePoolProps) => {

  const { savedMoney } = useSavedMoney()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [endingPool, setEndingPool] = useState<endingPoolPros>({
    endValue: '',
    endDate: ''
  })

  const handleDisable = () => {
    setLoading(prev => !prev)

    if (!endingPool.endValue || !endingPool.endDate) {
      toast.error('Invalide Assets', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    disablePool({ id, email, endingPool, savedMoney })
    toast.success('Pool desabled successfully', { richColors: true })
    setLoading(prev => !prev)
    setOpen(prev => !prev)
    setEndingPool({ endValue: '', endDate: '' })
  }

  return (
    <div>
      <div onClick={() => setOpen(prev => !prev)} className="flex cursor-pointer justify-center items-center lg:justify-start -ml-[10px] text-primary px-2 py-1 hover:bg-accent-foreground rounded-[5px]">
        <a>- Remove liquidity</a>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex justify-center items-center py-2 font-bold">
            <DialogTitle>Remove Liquidity</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-start justify-center w-full">
            <Label>Final value:</Label>
            <MaskedCurrencyInput value={endingPool.endValue} onChange={(e) => setEndingPool({ ...endingPool, endValue: e })} />
            <Label>End Date:</Label>
            <Input
              id="date"
              placeholder="00/00/0000"
              type="Date"
              onChange={(e) => setEndingPool({ ...endingPool, endDate: e.target.value })}
              required
            />
          </div>
          <DialogFooter>
            <Button onClick={handleDisable} className="w-full mt-2 cursor-pointer">
              {loading === true && <a>Remove and Disable</a>}
              {loading === false && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DisablePool;