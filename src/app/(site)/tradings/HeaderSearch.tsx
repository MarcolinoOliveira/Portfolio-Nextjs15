'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useAssetsWallet from "@/hooks/useAssetsWallet";
import { Dispatch, SetStateAction } from "react";
import { SlidersHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { CircleX } from 'lucide-react';

interface headerSearchProps {
  search: Array<string>
  setSearch: Dispatch<SetStateAction<Array<string>>>
}

const HeaderSearch = ({ search, setSearch }: headerSearchProps) => {

  const { assetsWallet } = useAssetsWallet()

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-3 flex-wrap items-center">
        <p className="font-bold lg:text-2xl">Your tradings</p>
        {search?.map((name, i) => (
          <div key={i} className="flex gap-2 bg-gradient-1 items-center px-3 rounded-2xl h-7 lg:h-9">
            <p className="font-semibold">{name}</p>
            <CircleX className="w-4 h-4 cursor-pointer hover:text-primary mt-1" onClick={() => setSearch(prev => prev.filter(item => item !== name))} />
          </div>
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className="cursor-pointer text-primary">
            FILTER <SlidersHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="end" className="flex flex-col p-1 w-40 gap-1 bg-background">
          {assetsWallet?.map((asset, index) => (
            <PopoverClose asChild key={index}>
              <div className="flex items-center gap-2 py-1 cursor-pointer hover:bg-accent-foreground " onClick={() => setSearch([...search, asset.name])}>
                <img src={asset.image} alt="symbol" className="w-5 h-5" />
                <p>{asset.name}</p>
              </div>
            </PopoverClose>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default HeaderSearch;