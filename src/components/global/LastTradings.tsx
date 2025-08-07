'use client'

import { Button } from "@/components/ui/button";
import useTraders from "@/hooks/useTraders";
import { useRouter } from "next/navigation";

const LastTradings = () => {

  const { traders } = useTraders()
  const router = useRouter()

  const lastTraders = traders.slice(-4)
  const orderByDataTrader = lastTraders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (!traders) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex w-full justify-between py-1 items-center font-semibold">
        <a>Transactions</a>
        <Button variant='link' size={null} className="cursor-pointer text-primary" onClick={() => router.push('/tradings')}>
          View all
        </Button>
      </div>
      <div className="flex flex-col xl:max-h-full gap-1.5">
        {orderByDataTrader.map((item, index) => (
          <div key={index} className="flex w-full pt-4 items-center justify-between font-semibold pr-1">
            <div className="flex justify-start gap-2">
              <img src={item.image} alt="symbol" className="w-9 h-9 rounded-full mt-1" />
              <div className="flex flex-col">
                <a className="">{item.name}</a>
                <a className="text-text-gray uppercase ">{item.symbol}</a>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end">
              <a> {item.value}</a>
              <div className="flex gap-2">
                <a className={`${item.status === 'buy' ? 'text-chart-4' : 'text-red-600'} uppercase`}>{item.status}</a>
                <a className="text-text-gray ">{item.date?.split('-').reverse().join('/')}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LastTradings;