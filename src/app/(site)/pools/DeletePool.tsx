'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"
import { useState } from "react";
import { BadgeX } from 'lucide-react';
import { deletePool } from "@/app/firebase/deleteDocs";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

interface DeletePoolProps {
  id: string
  email: string
}

const DeletePool = ({ id, email }: DeletePoolProps) => {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleDeletePool = () => {
    setLoading(prev => !prev)
    deletePool({ email, id })
    toast.success('Pool deleted successfully', { richColors: true })
    setLoading(prev => !prev)
    setOpen(prev => !prev)
  }

  return (
    <div>
      <div onClick={() => setOpen(prev => !prev)} className="cursor-pointer mr-10 lg:mr-0 text-red-500 hover:bg-accent-foreground p-1 rounded-[5px]">
        <BadgeX size={20} />
      </div>
      <AlertDialog open={open} onOpenChange={() => setOpen(prev => !prev)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently delete your pool and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex gap-2 items-center w-full">
              <AlertDialogCancel className="w-1/2 cursor-pointer">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeletePool} className="w-1/2 cursor-pointer">
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

export default DeletePool
