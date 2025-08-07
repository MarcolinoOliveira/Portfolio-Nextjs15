'use client'

import useBalanceTotal from "@/hooks/useBalanceTotal";
import useCoreApi from "@/hooks/useCoreApi";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

const BalanceTotal = () => {

  const { balanceTotalData } = useBalanceTotal()
  const { data } = useCoreApi()
  const [usdValue, setUsdValue] = useState(0)

  useEffect(() => {
    const fetchCotacao = async () => {
      try {
        const res = await fetch("/api/cotacaoUsd");
        const data = await res.json();
        setUsdValue(data.rate);
      } catch (err) {
        console.error("Erro ao buscar cotação:", err);
      }
    };

    fetchCotacao();
  }, []);

  const brlUsd = usdValue ? (balanceTotalData.balanceTotal / usdValue) : 0

  if (!data) return <div>Loading..</div>

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <p className="font-semibold text-text-gray">Total balance</p>
      </div>
      <div className="flex-1">
        <a className="flex font-bold text-3xl items-center">
          {balanceTotalData.balanceTotal?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </a>
      </div>
      <div className="flex w-full justify-between px-3">
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold text-text-gray">BTC</p>
          <p className="font-semibold">
            {(balanceTotalData.balanceTotal / data[0]?.current_price)?.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 6 })}
          </p>
        </div>
        <Separator className="bg-border mt-0.5" orientation="vertical" />
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold text-text-gray">BRL</p>
          <p className="font-semibold">
            {brlUsd?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BalanceTotal;