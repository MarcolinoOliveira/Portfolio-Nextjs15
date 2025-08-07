'use client'

import { BalanceTotalProps } from "@/interfaces/interfaces"
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react"

interface BalanceTotalContextProps {
  balanceTotalData: BalanceTotalProps
  setBalanceTotalData: Dispatch<SetStateAction<BalanceTotalProps>>
  loading: boolean
  toogleLoadingBalance: () => void
}

const BalanceTotalContext = createContext({} as BalanceTotalContextProps)

export const BalanceTotalProvider = ({ children }: { children: ReactNode }) => {

  const [balanceTotalData, setBalanceTotalData] = useState<BalanceTotalProps>({
    balanceTotal: 0,
    totalBalanceAssets: 0,
    totalAllPools: 0,
    totalUsd: 0,
    totalBrl: 0,
    totalBrlUsd: 0,
    borrow: 0,
  })

  const [loading, setLoading] = useState<boolean>(true)

  const toogleLoadingBalance = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <BalanceTotalContext.Provider value={{ balanceTotalData, setBalanceTotalData, loading, toogleLoadingBalance }}>
      {children}
    </BalanceTotalContext.Provider>
  )
}

export default BalanceTotalContext