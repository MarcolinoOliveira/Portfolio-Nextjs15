'use client'

import { getAllDisabledPools } from "@/app/firebase/getDocs";
import { auth } from "@/lib/firebase";
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import DeletePool from "./DeletePool";
import { getDaysActiveDisablePool } from "@/lib/formatDate";
import { finalPnL } from "@/lib/utils";
import { AllPoolsProps } from "@/interfaces/interfaces";
import { ChevronDown, ChevronUp } from 'lucide-react';

const DisabledPools = () => {

  const [disabledPools, setDisabledPools] = useState<AllPoolsProps[]>([])
  const [loading, setLoading] = useState(false)
  const [user] = useAuthState(auth)
  const [showPools, setShowPools] = useState(false)

  const email = user?.email

  const handleShowPools = () => {
    if (!email) return
    setLoading(prev => !prev)
    setShowPools(prev => !prev)
    getAllDisabledPools({ email, setDisabledPools, setLoading })
  }

  return (
    <div>
      <div onClick={() => handleShowPools()} className="flex w-full cursor-pointer items-center justify-center -mt-5 mb-5 p-4 
          bg-gradient-to-b from-sidebar via-muted to-accent rounded-2xl inset-shadow-sm inset-shadow-border hover:inset-shadow-[#9F76F8] transition-shadow">
        <a className="flex gap-1.5 items-center font-semibold">Disabled pools {showPools ? <ChevronUp size={23} /> : <ChevronDown size={23} />}</a>
      </div>
      <div className={`${showPools ? 'flex' : 'hidden'} flex-col`}>

        {loading && <div>Loading...</div>}

        {disabledPools?.map((pool, i) => (
          <div key={i} className="flex flex-col max-w-full bg-gradient-to-b from-sidebar via-muted to-accent rounded-2xl mb-5 inset-shadow-sm inset-shadow-border">

            <div className="flex w-full items-center justify-center rounded-t-2xl -mt-2">
              <a className="bg-red-600 rounded-2xl text-[12px] px-1 font-bold text-white">POOL DESABLED</a>
            </div>

            <div className="flex flex-col lg:flex-row max-w-full items-center gap-2 lg:gap-0 pt-3 pb-4 px-4">

              <div className="flex flex-1 items-center w-auto">
                <img src={pool.imageFirst} alt="symbol" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full" />
                <img src={pool.imageSecond} alt="symbol" className="w-8 h-8 lg:w-10 lg:h-10 -ml-2 rounded-full" />
                <a className="ml-5 font-bold">{pool.symbolFirst} / {pool.symbolSecond}</a>
              </div>

              <div className="flex justify-between gap-1.5 w-full lg:w-[18%] items-center">
                <div className="flex flex-col w-1/2 items-start justify-start px-3 lg:gap-1">
                  <a className="text-text-gray">Start Value</a>
                  <a className="font-bold text-[15px]">{pool.startValue}</a>
                </div>
                <div className="flex flex-col w-1/2 items-start justify-start px-3 lg:gap-1">
                  <a className="text-text-gray">Fees</a>
                  <a className="font-bold text-[15px]">{pool.fees} </a>
                </div>
              </div>

              <div className="flex justify-between gap-1.5 w-full lg:w-[18%] items-center">
                <div className="flex flex-col w-full items-start justify-start px-3 lg:gap-1">
                  <a className="text-text-gray">Start Date</a>
                  <a className="font-bold text-[15px]">{pool.startDate?.split('-').reverse().join('/')}</a>
                </div>
                <div className="flex flex-col w-full items-start justify-start px-3 lg:gap-1">
                  <a className="text-text-gray">End Date</a>
                  <a className="font-bold text-[15px]">{pool.endDate?.split('-').reverse().join('/')}</a>
                </div>
              </div>

              <div className="flex justify-between gap-1.5 w-full lg:w-[18%] items-center">
                <div className="flex flex-col w-full items-start justify-start px-3 lg:gap-1">
                  <a className="text-text-gray">End Value</a>
                  <a className="font-bold text-[15px]">{pool.endValue}</a>
                </div>
                <div className="flex flex-col w-full items-start justify-start px-3 lg:gap-1">
                  <a className="text-text-gray">PnL</a>
                  <a className={`${finalPnL({ pool }) >= 0 ? 'text-chart-4' : 'text-red-500'} font-bold text-[15px]`}>
                    {finalPnL({ pool }).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </a>
                </div>
              </div>

              <div className="flex gap-1.5 w-full lg:w-[14%] pr-1.5 lg:px-1.5 items-center justify-between lg:justify-end">
                <div className="flex w-auto px-3 gap-1">
                  <a className="text-text-gray">Actives days:</a>
                  <a className="font-bold text-[15px]">{getDaysActiveDisablePool(pool.startDate, pool.endDate)}</a>
                </div>
                <div className="flex w-auto">
                  {email && <DeletePool id={pool.id} email={email} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisabledPools;