'use client'

import { getAllActivatedPools } from "@/app/firebase/getDocs";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import CollectFees from "./CollectFees";
import DisablePool from "./DisablePool";
import { getDaysActive } from "@/lib/formatDate";
import AddLiquidity from "./AddLiquidity";
import ChangePairs from "./ChangePairs";
import { AllPoolsProps } from "@/interfaces/interfaces";
import { poolYield } from "@/lib/utils";

const ActivatedPools = () => {

  const [activatedPools, setActivatedPools] = useState<AllPoolsProps[]>([])
  const [loading, setLoading] = useState(true)

  const [user] = useAuthState(auth)

  const email = user?.email

  useEffect(() => {
    if (!email) return
    getAllActivatedPools({ email, setActivatedPools, setLoading })
  }, [email])


  if (loading) return <div>Carregando...</div>

  return (
    <div>
      {activatedPools?.map((pool, i) => (
        <div key={i} className="flex flex-col max-w-full bg-gradient-to-b from-sidebar via-muted to-accent rounded-2xl mb-5 inset-shadow-sm inset-shadow-border">

          <div className="flex w-full items-center justify-center rounded-t-2xl -mt-2">
            <a className="bg-green-600 rounded-2xl text-[12px] px-1 font-bold text-white">POOL ACTIVATED</a>
          </div>

          <div className="flex flex-col lg:flex-row max-w-full items-center gap-2 lg:gap-0 pt-3 pb-4 px-4">

            <div className="flex flex-1 items-center">
              <div className="flex items-start justify-start">
                <img src={pool.imageFirst} alt="symbol" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full" />
                <img src={pool.imageSecond} alt="symbol" className="w-8 h-8 lg:w-10 lg:h-10 -ml-2 rounded-full" />
              </div>
              <div className="flex flex-col items-start justify-start ml-5">
                <a className="font-bold">{pool.symbolFirst} / {pool.symbolSecond}</a>
                {email && <ChangePairs id={pool.id} email={email} />}
              </div>
            </div>

            <div className="flex gap-1.5 justify-between w-full lg:w-[23%] items-center">
              <div className="flex flex-col w-full items-start justify-start px-3">
                <a className="text-text-gray font-semibold">Start value</a>
                <a className="font-bold">{pool.startValue}</a>
                {email && <AddLiquidity email={email} id={pool.id} startValue={pool.startValue} />}
              </div>
              <div className="flex flex-col w-full items-start justify-start px-3">
                <a className="text-text-gray">Fees Earned</a>
                <a className="font-bold">{pool.fees}</a>
                {email && <CollectFees id={pool.id} email={email} fees={pool.fees} />}
              </div>
            </div>

            <div className="flex gap-1.5 justify-between w-full lg:w-[20%] lg:h-20">
              <div className="flex flex-col w-full items-start justify-start px-3">
                <a className="text-text-gray font-semibold">Profit</a>
                <a className="text-chart-4 font-bold">
                  %{poolYield({ pool }).toFixed(2)}
                </a>
              </div>
              <div className="flex flex-col w-full items-start justify-start px-3">
                <a className="text-text-gray font-semibold">Start date</a>
                <a className="font-bold">{pool.startDate?.split('-').reverse().join('/')}</a>
              </div>
            </div>

            <div className="flex lg:flex-col gap-1.5 w-full lg:w-[16%] items-start justify-start">
              <div className="flex flex-col px-3 lg:ml-10">
                <a className="text-text-gray font-semibold">Actives days</a>
                <a className="font-bold text-[15px]">{getDaysActive(pool.startDate)} days</a>
                {email && <DisablePool id={pool.id} email={email} />}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivatedPools;