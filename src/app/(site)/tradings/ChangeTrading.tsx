'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { SquarePen } from 'lucide-react';
import MaskedCurrencyInput from "@/lib/MaskCurrencyInput";
import { LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { changeValueProps } from "@/interfaces/interfaces";
import { toast } from "sonner";
import { updateOnlyTrade } from "@/app/firebase/updateDocs";
import useSavedMoney from "@/hooks/useSavedMoney";

interface ChangeTratingProps {
  id: string
  status: string
  oldValue: string
  setPopoverOpen?: Dispatch<SetStateAction<boolean>>
}

const ChangeTrating = ({ id, status, oldValue, setPopoverOpen }: ChangeTratingProps) => {

  const { savedMoney } = useSavedMoney()
  const [changeValue, setChangeValue] = useState<changeValueProps>({
    priceCoin: '',
    value: '',
    date: ''
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [user] = useAuthState(auth)

  const email = user?.email

  const handleChange = async () => {
    if (!email) return
    setLoading(prev => !prev)

    if (!changeValue.priceCoin || !changeValue.date || !changeValue.value) {
      toast.error('Invalid assets', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    await updateOnlyTrade({ id, email, changeValue, oldValue, status, savedMoney })
    toast.success('Trade changed successfully', { richColors: true })
    setLoading(prev => !prev)
    setOpen(prev => !prev)
    if (setPopoverOpen) setPopoverOpen(prev => !prev)
    setChangeValue({ priceCoin: '', value: '', date: '' })
  }

  return (
    <>
      <Button size={null} onClick={() => setOpen(prev => !prev)} className="cursor-pointer text-chart-4 hover:text-primary" variant='ghost'>
        <p className="flex lg:hidden pr-1">Change</p><SquarePen className="mt-1 lg:mt-0" />
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex justify-center items-center py-2 font-bold">
            <DialogTitle>Change Trading</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-start justify-center w-full">
            <Label>Currency price:</Label>
            <MaskedCurrencyInput value={changeValue.priceCoin} onChange={(e) => setChangeValue({ ...changeValue, priceCoin: e })} />
            <Label>Amount:</Label>
            <MaskedCurrencyInput value={changeValue.value} onChange={(e) => setChangeValue({ ...changeValue, value: e })} />
            <Label>Date:</Label>
            <Input
              id="date"
              placeholder="00/00/0000"
              type="Date"
              onChange={(e) => setChangeValue({ ...changeValue, date: e.target.value })}
              required
            />
          </div>
          <DialogFooter>
            <Button onClick={handleChange} className="w-full mt-2 cursor-pointer">
              {loading && <a>Change</a>}
              {!loading && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChangeTrating;