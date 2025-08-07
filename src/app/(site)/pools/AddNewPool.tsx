'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import MaskedCurrencyInput from "../../../lib/MaskCurrencyInput";
import { newPoolProps } from "@/interfaces/interfaces";
import { toast } from "sonner";
import { addNewPool } from "@/app/firebase/addDocs";
import { LoaderCircle } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import SelectPair from "./SelectPair";
import useSavedMoney from "@/hooks/useSavedMoney";

const AddNewPool = () => {

  const { savedMoney } = useSavedMoney()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newPool, setNewPool] = useState<newPoolProps>({
    imageFirst: '',
    symbolFirst: '',
    imageSecond: '',
    symbolSecond: '',
    startValue: '',
    startDate: '',
  })

  const [user] = useAuthState(auth)

  const handleAddNewPool = async () => {
    setLoading(prev => !prev)

    if (!newPool.symbolFirst || !newPool.symbolSecond || !newPool.startValue || !newPool.startDate) {
      toast.error('Invalide Assets', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    try {
      if (user?.email) {
        await addNewPool(newPool, user.email, savedMoney)

        toast.success('Pool added successfully', { richColors: true })
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
    <>
      <Button onClick={() => setOpen(prev => !prev)} className="cursor-pointer w-full lg:w-auto">
        <a>Create Position</a>
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex justify-center items-center py-2 font-bold">
            <DialogTitle>New Pool</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-start justify-center w-full">
            <Label>Select Pair:</Label>
            <div className="w-full pr-2.5">
              <SelectPair newPool={newPool} setNewPool={setNewPool} />
            </div>
            <Label>Applied value:</Label>
            <MaskedCurrencyInput value={newPool.startValue} onChange={(e) => setNewPool({ ...newPool, startValue: e })} />
            <Label>Start Date:</Label>
            <Input
              id="date"
              placeholder="00/00/0000"
              type="Date"
              onChange={(e) => setNewPool({ ...newPool, startDate: e.target.value })}
              required
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddNewPool} className="w-full mt-2 cursor-pointer">
              {loading && <a>Create</a>}
              {!loading && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewPool;