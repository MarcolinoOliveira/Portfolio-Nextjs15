'use client'

import useSavedMoney from "@/hooks/useSavedMoney";
import AddSavedMoney from "./AddSavedMoney";

const Borrowed = () => {

  const { savedMoney, loading } = useSavedMoney()

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-6">
      <a className="text-text-gray font-semibold">Borrowed</a>
      <a className="font-bold text-2xl h-15">{savedMoney.borrow?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} USD</a>
      <div className="flex w-full gap-1">
        <AddSavedMoney status="Borrow" currency="usd" />
        <AddSavedMoney status="Repay" currency="usd" />
      </div>
    </div>
  );
}

export default Borrowed;