'use client'

import { Button } from "@/components/ui/button";
import useBalanceTotal from "@/hooks/useBalanceTotal";
import { useRouter } from "next/navigation";

const CashPools = () => {

  const { balanceTotalData } = useBalanceTotal()
  const router = useRouter()

  const handlePools = () => {
    router.push('/pools')
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <a className="text-text-gray font-semibold">Cash on liquidity pools</a>
      <a className="font-bold text-2xl h-15">{balanceTotalData.totalAllPools?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
      <Button variant='outline' onClick={handlePools} className="text-primary hover:bg-accent-foreground cursor-pointer">
        View liquidity pools
      </Button>
    </div>
  );
}

export default CashPools;