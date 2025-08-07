'use client'

import { deleteTrading } from "@/app/firebase/deleteDocs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useSavedMoney from "@/hooks/useSavedMoney";
import { auth } from "@/lib/firebase";
import { BadgeX, LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

interface deleteTradingProps {
  id: string
  status: string
  value: string
  setPopoverOpen?: Dispatch<SetStateAction<boolean>>
}

const DeleteTrading = ({ id, status, value, setPopoverOpen }: deleteTradingProps) => {

  const { savedMoney } = useSavedMoney()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user] = useAuthState(auth)

  const email = user?.email

  const handleDeleteTrade = async () => {
    if (!email) return
    setLoading(prev => !prev)

    await deleteTrading({ id, email, status, savedMoney, value })
    toast.success('Trading deleted successfully', { richColors: true })
    setLoading(prev => !prev)
    setOpen(prev => !prev)
    if (setPopoverOpen) setPopoverOpen(prev => !prev)
  }

  const handleCancel = () => {
    setOpen(prev => !prev)
    if (setPopoverOpen) setPopoverOpen(prev => !prev)
  }

  return (
    <>
      <Button size={null} onClick={() => setOpen(prev => !prev)} className="cursor-pointer text-red-500 hover:text-primary" variant='ghost'>
        <p className="flex lg:hidden mr-1">Delete</p><BadgeX className="mt-1 lg:mt-0" />
      </Button>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently delete your Trading and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex gap-2 items-center w-full">
              <AlertDialogCancel className="w-1/2 cursor-pointer" onClick={handleCancel}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteTrade} className="w-1/2 cursor-pointer">
                {!loading && <LoaderCircle className="animate-spin" />}
                {loading && <a>Continue</a>}
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteTrading;