'use client'

import { addSavedMoney } from "@/app/firebase/addDocs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useSavedMoney from "@/hooks/useSavedMoney";
import { auth } from "@/lib/firebase";
import MaskedCurrencyBRL from "@/lib/MaskCurrencyBRL";
import MaskedCurrencyInput from "@/lib/MaskCurrencyInput";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

interface AddSavedMoneyProps {
  status: string
  currency: string
}

const AddSavedMoney = ({ status, currency }: AddSavedMoneyProps) => {

  const { savedMoney } = useSavedMoney()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newMoney, setNewMoney] = useState('')
  const [user] = useAuthState(auth)

  const email = user?.email

  const handleNewMoney = async () => {
    if (!email) return
    setLoading(prev => !prev)

    if (!newMoney) {
      toast.error('Invalide Assets', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    let numberNewMoney = 0

    if (currency === 'usd') numberNewMoney = parseFloat(newMoney?.replace(/\$\s?|/g, '').replace(',', '.'))
    if (currency === 'brl') numberNewMoney = parseFloat(newMoney?.replace(/R\$\s?|[\.\-]/g, '').replace(',', '.'))
    if (status === 'Repay') numberNewMoney = parseFloat(newMoney?.replace(/\$\s?|/g, '').replace(',', '.'))

    if (status === 'Withdraw' && currency === 'usd' && numberNewMoney > savedMoney.usd) {
      toast.error('You do not have that amount', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    if (status === 'Withdraw' && currency === 'brl' && numberNewMoney > savedMoney.brl) {
      toast.error('You do not have that amount', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    if (status === 'Repay' && currency === 'usd' && numberNewMoney > savedMoney.borrow) {
      toast.error('You do not have that amount', { richColors: true })
      setLoading(prev => !prev)
      return
    }

    await addSavedMoney({ email, status, currency, numberNewMoney, savedMoney })
    setLoading(prev => !prev)
    setOpen(prev => !prev)
    toast.success('Money added successfully', { richColors: true })
    setNewMoney('')
  }

  return (
    <>
      <Button onClick={() => setOpen(prev => !prev)} className="cursor-pointer w-1/2 text-primary hover:bg-accent-foreground" variant='outline'>
        <a>{status}</a>
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex justify-center items-center py-2 font-bold">
            <DialogTitle>{status}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-start justify-center w-full">
            <Label>{status} value:</Label>
            {currency === 'usd' && <MaskedCurrencyInput value={newMoney} onChange={(e) => setNewMoney(e)} />}
            {currency === 'brl' && <MaskedCurrencyBRL value={newMoney} onChange={(e) => setNewMoney(e)} />}
          </div>
          <DialogFooter>
            <Button onClick={handleNewMoney} className="w-full mt-2 cursor-pointer">
              {loading === true && <a>{status}</a>}
              {loading === false && <LoaderCircle className="animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddSavedMoney;