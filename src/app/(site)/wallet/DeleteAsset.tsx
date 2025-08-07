'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { useState } from "react";
import { BadgeX } from 'lucide-react';
import { deleteCoinTrader, deleteCoinWallet } from "@/app/firebase/deleteDocs";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import useTraders from "@/hooks/useTraders";
import useSavedMoney from "@/hooks/useSavedMoney";
import { updateDeleteAsset } from "@/app/firebase/updateDocs";

interface DeleteAssetProps {
  id: string
  name: string
  email: string
  clear: () => void
}

const DeleteAsset = ({ id, name, email, clear }: DeleteAssetProps) => {

  const { traders } = useTraders()
  const { savedMoney } = useSavedMoney()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleDeleteAsset = async () => {
    if (!email) return
    setLoading(prev => !prev)

    let newSavedMoney = 0

    traders.forEach(async (trade) => {
      if (trade.name === name) {
        if (trade.status === 'buy') newSavedMoney += parseFloat(trade.value?.replace(/\$\s?|/g, '').replace(',', '.'))
        if (trade.status === 'sell') newSavedMoney -= parseFloat(trade.value?.replace(/\$\s?|/g, '').replace(',', '.'))
        await deleteCoinTrader({ email, id: trade.id })
      }
    })
    await updateDeleteAsset({ email, newSavedMoney, savedMoney })
    await deleteCoinWallet({ email, id })

    toast.success("Currency deleted successfully", { richColors: true })
    setLoading(prev => !prev)
    clear()
    setOpen(prev => !prev)
  }

  return (
    <div>
      <div onClick={() => setOpen(prev => !prev)} className="cursor-pointer text-red-500 hover:bg-accent-foreground rounded-[5px]">
        <BadgeX size={16} />
      </div>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently delete your Asset and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex gap-2 items-center w-full">
              <AlertDialogCancel className="w-1/2 cursor-pointer" onClick={() => setOpen(prev => !prev)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAsset} className="w-1/2 cursor-pointer">
                {!loading && <LoaderCircle className="animate-spin" />}
                {loading && <a>Continue</a>}
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteAsset