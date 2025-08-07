'use client'

import { Button } from "@/components/ui/button";
import useBalanceTotal from "@/hooks/useBalanceTotal";
import { useRouter } from "next/navigation";

const CashWallet = () => {

  const { balanceTotalData } = useBalanceTotal()
  const router = useRouter()

  const handleWallet = () => {
    router.push('/wallet')
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <a className="text-text-gray font-semibold">Purchased assets</a>
      <a className="font-bold text-2xl h-15">{balanceTotalData.totalBalanceAssets?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
      <Button variant='outline' onClick={handleWallet} className="text-primary hover:bg-accent-foreground cursor-pointer">
        View wallet
      </Button>
    </div>
  );
}

export default CashWallet;