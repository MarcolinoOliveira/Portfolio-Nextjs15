'use client'

import useSavedMoney from "@/hooks/useSavedMoney";
import AddSavedMoney from "./AddSavedMoney";

const CashHandBrl = () => {

  const { savedMoney, loading } = useSavedMoney()

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-6">
      <a className="text-text-gray font-semibold">Cash on hand</a>
      <div className="flex flex-col gap-1">
        <a className="font-bold text-2xl">{savedMoney.brl?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} BRL</a>
        <a className="font-semibold text-text-gray">{savedMoney.brlUsd?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
      </div>
      <div className="flex gap-1">
        <AddSavedMoney status="Withdraw" currency="brl" />
        <AddSavedMoney status="Deposit" currency="brl" />
      </div>
    </div>
  );
}

export default CashHandBrl;