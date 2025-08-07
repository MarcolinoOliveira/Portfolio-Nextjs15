'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { tradersProfitProps } from "@/interfaces/interfaces";
import { PopoverClose } from "@radix-ui/react-popover";
import { EllipsisVertical } from 'lucide-react';
import ChangeTrating from "./ChangeTrading";
import DeleteTrading from "./DeleteTrading";
import { useState } from "react";

interface DetailsMobileProps {
  item: tradersProfitProps
}

const DetailsMobile = ({ item }: DetailsMobileProps) => {

  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant='ghost' size={null} className="cursor-pointer hover:text-primary">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="flex flex-col p-2 w-48 gap-y-1 bg-background">
        <div className="grid grid-cols-3 font-semibold text-[12px] gap-1.5">
          <p className="flex justify-start col-span-2">Currency price</p>
          <p className="flex justify-end">{item.priceCoin}</p>
          <p className="flex justify-start col-span-2">Invested value</p>
          <p className="flex justify-end">{item.value}</p>
          <p className="flex justify-start col-span-2">Type</p>
          <p className="flex justify-end">{item.status}</p>
          <p className="flex justify-start">Cryptos</p>
          <p className="flex justify-end col-span-2">{item.cryptos?.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 6 })}</p>
          <p className="flex justify-start">Profit</p>
          {item.status === 'buy' &&
            <p className={`flex justify-end col-span-2 ${item.profit >= 0 ? 'text-chart-4' : 'text-red-600'}`}>
              {`${item.profit?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (${item.percent}%)`}
            </p>}
          <p className="flex justify-start">Date</p>
          <p className="flex justify-end col-span-2">{item.date?.split('-').reverse().join('/')}</p>
        </div>

        <div className="flex w-full items-center gap-2 py-1 justify-between">
          <ChangeTrating id={item.id} status={item.status} oldValue={item.value} setPopoverOpen={setPopoverOpen} />
          <DeleteTrading id={item.id} status={item.status} value={item.value} setPopoverOpen={setPopoverOpen} />
        </div>

      </PopoverContent>
    </Popover>
  );
}

export default DetailsMobile;