'use client'

import useSavedMoney from "@/hooks/useSavedMoney";
import AddSavedMoney from "./AddSavedMoney";

const CashHandUsd = () => {

  const { savedMoney, loading } = useSavedMoney()

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-6 w-full">
      <a className="text-text-gray font-semibold">Cash on hand</a>
      <a className="font-bold text-2xl h-15">{savedMoney.usd?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
      <div className="flex w-full gap-1">
        <AddSavedMoney status="Withdraw" currency="usd" />
        <AddSavedMoney status="Deposit" currency="usd" />
      </div>
    </div>
  );
}

export default CashHandUsd;