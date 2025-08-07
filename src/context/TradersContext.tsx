'use client'

import { tradeProps } from "@/interfaces/interfaces"
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react"

interface TradersContextProps {
  traders: tradeProps[]
  setTraders: Dispatch<SetStateAction<tradeProps[]>>
  loading: boolean
  toogleLoadingTraders: () => void
}

const TradersContext = createContext({} as TradersContextProps)

export const TradersProvider = ({ children }: { children: ReactNode }) => {

  const [traders, setTraders] = useState<tradeProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const toogleLoadingTraders = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <TradersContext.Provider value={{ traders, setTraders, loading, toogleLoadingTraders }}>
      {children}
    </TradersContext.Provider>
  )
}

export default TradersContext