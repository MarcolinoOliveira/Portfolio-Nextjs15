'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { newPoolProps } from "@/interfaces/interfaces";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { changePair } from "@/app/firebase/updateDocs";
import { SquarePen } from 'lucide-react';
import SelectPair from "./SelectPair";

interface changePairProps {
  id: string
  email: string
}

const ChangePairs = ({ id, email }: changePairProps) => {

  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const [newPool, setNewPool] = useState<newPoolProps>({
    imageFirst: '',
    symbolFirst: '',
    imageSecond: '',
    symbolSecond: '',
    startValue: '',
    startDate: '',
  })


  const handleChangePair = async () => {
    setLoading(prev => !prev)

    if (!newPool.symbolFirst || !newPool.symbolSecond) {
      toast.error('Invalide Assets', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    try {
      if (email) {
        await changePair({ newPool, id, email })

        toast.success('Pool Changed successfully', { richColors: true })
        setLoading(prev => !prev)
        setOpen(prev => !prev)
        setNewPool({
          imageFirst: '',
          symbolFirst: '',
          imageSecond: '',
          symbolSecond: '',
          startValue: '',
          startDate: '',
        })
      }

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div onClick={() => setOpen(prev => !prev)} className="flex gap-0.5 -ml-[10px] items-center cursor-pointer text-primary px-2 py-1 hover:bg-accent-foreground rounded-[5px]">
        <SquarePen size={14} />
        <a> Change pairs</a>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex justify-center items-center py-2 font-bold">
            <DialogTitle>Change Pairs</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-start justify-center w-full">
            <Label>Select Pair:</Label>
            <div className="w-full pr-2.5">
              <SelectPair newPool={newPool} setNewPool={setNewPool} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleChangePair} className="w-full mt-2 cursor-pointer">
              {loading === true && <a>Change</a>}
              {loading === false && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangePairs;